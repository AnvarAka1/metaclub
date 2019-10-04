import React, { Component } from "react";
import Grid from "../../components/Grid/Grid";
// import MainImage from "../../components/MainImage/MainImage";
import Header from "../../components/UI/Header/Header";
// import Text from "../../components/UI/Text/Text";
import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import Comments from "../../components/Comments/Comments";
import Paper from "../../components/UI/Paper/Paper";
import axios from "../../axios-db";
// import Spinner from "../../components/Spinner/Spinner";
import { connect } from "react-redux";
// import ReactHtmlParser from "react-html-parser";
import localIpUrl from "local-ip-url";
import Hidden from "@material-ui/core/Hidden";
import Content from "../../components/Content/Content";
import Banner from "../../components/Banner/Banner";
import Img from "../../assets/images/banner/banner.jpg";

export class ArticlePage extends Component {
	state = {
		commentForm: {
			comment: {
				inputType: "textarea",
				config: {
					name: "comment",
					placeholder: "Добавить комментарий...",
					type: "text"
				},
				value: ""
			}
		},
		profile: null,
		article: null,
		comments: null,
		lang: 0,
		loading: true,
		banner: null
	};

	componentDidMount() {
		const { id } = this.props.match.params;
		let profile = null;
		let article = null;
		let comments = null;

		axios
			.get(`/articles/${id}`)
			.then(res => {
				// console.log(res.data);
				article = res.data;
				return axios.get(`/users/${res.data.user_id}`);
			})
			.then(res => {
				profile = res.data;
				return axios.get(`/articles/user/${res.data.id}`);
			})
			.then(res => {
				profile.total = res.data.total;
				return axios.get(`/articles/${id}/comments`);
			})
			.then(res => {
				comments = res.data;
				this.setState({ article: article, profile: profile, comments: comments, loading: false });
				const formData = new FormData();
				formData.append("article_id", article.id);
				formData.append("client_IP", localIpUrl("public"));
				formData.append("user_agent", navigator.userAgent);
				return axios.post(`/articles/view/create`, formData);
			})
			.then(res => {
				// console.log(res);
			})
			.catch(err => {
				console.log("Error ", err);
			});
		axios
			.get("/banner")
			.then(res => {
				this.setState({ banner: res.data });
			})
			.catch(err => console.log(err));
	}

	commentHandler = (event, id) => {
		this.props.history.push(`/users/${id}`);
		window.scrollTo({ top: "0" });
	};
	commentSubmitHandler = event => {
		event.preventDefault();
		//axios.then
		const data = {
			article_id: this.props.match.params.id,
			body: this.state.commentForm.comment.value
		};
		axios
			.post("/articles/comments/create", data, {
				headers: {
					Authorization: `${localStorage.getItem("token")}`
				}
			})
			.then(res => {
				axios
					.get(`/articles/${res.data.article_id}/comments`)
					.then(res => {
						const commentForm = { ...this.state.commentForm };
						commentForm.comment.value = "";
						this.setState({ comments: res.data, commentForm: commentForm });
					})
					.catch(err => {
						console.log("Error", err);
					});
			})
			.catch(err => {
				console.log("Err", err);
			});
	};
	commentChangedHandler = (event, inputIdentifier) => {
		const value = event.target.value;
		const commentForm = { ...this.state.commentForm };
		commentForm[inputIdentifier].value = value;
		this.setState({ commentForm: commentForm });
	};
	viewProfileHandler = (event, id) => {
		// redirect

		this.props.history.push(`/users/${id}`);
		window.scrollTo({ top: "0" });
	};
	render() {
		// let image = <Spinner />;
		const banner1 = {
			link: "http://hello.html",
			src: Img,
			title: "Title"
		};
		let banner = this.state.banner ? <Banner banner={this.state.banner} /> : <Banner banner={banner1} />;
		let article = null;
		let profile = null;
		let comments = null;
		if (!this.state.loading) {
			// image = this.state.article && (
			// 	<MainImage src={`${this.state.article.image}`} alt={this.state.article.title} />
			// );
			article = this.state.article && (
				<Paper blank article>
					<Header color="#333" mb h2>
						{this.state.article.title}
					</Header>
					<Header h5 normal headerStyle={{ lineHeight: "40px" }}>
						<Content body={this.state.article.body} />
					</Header>
				</Paper>
			);
			profile = this.state.profile && (
				<ProfileCard
					clicked={this.viewProfileHandler}
					lang={this.props.lang}
					profile={this.state.profile}
					viewProfile
				/>
			);
			comments = this.state.comments && (
				<Comments
					lang={this.props.lang}
					isAuthorized={this.props.isAuthorized}
					commentForm={this.state.commentForm}
					commentClicked={this.commentHandler}
					commentSubmitted={this.commentSubmitHandler}
					commentChanged={this.commentChangedHandler}
					comments={this.state.comments}
				/>
			);
		}
		return (
			<React.Fragment>
				{/* <Grid container mbbig="true">
					{image}
				</Grid> */}
				<Grid container con="true" spacing={5}>
					<Hidden smDown>
						<Grid item sm={1} />
					</Hidden>
					<Grid item sm={8} md={7} xs={12}>
						{article}
						{comments}
					</Grid>
					<Grid item sm={4} md={3} xs={12}>
						{profile}
						{banner}
					</Grid>
					<Hidden smDown>
						<Grid item sm={1} />
					</Hidden>
				</Grid>
			</React.Fragment>
		);
	}
}
const mapStateToProps = state => {
	return {
		isAuthorized: state.auth.token !== null,
		lang: state.lang.lang
	};
};

export default connect(mapStateToProps)(ArticlePage);
