import React, { Component } from "react";
import Grid from "../../components/Grid/Grid";
import MainImage from "../../components/MainImage/MainImage";
import Header from "../../components/UI/Header/Header";
import Text from "../../components/UI/Text/Text";
import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import ProfilePhoto from "../../assets/images/profile/profile.png";
import Comments from "../../components/Comments/Comments";
import Paper from "../../components/UI/Paper/Paper";
import axios from "../../axios-db";
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
		lang: 0
	};

	componentDidMount() {
		const { id } = this.props.match.params;
		let profile = null;
		let article = null;
		let comments = null;

		axios
			.get(`/articles/${id}`)
			.then(res => {
				console.log(res.data);
				article = res.data;
				return axios.get(`/users/${res.data.user_id}`);
			})
			.then(res => {
				console.log(res);
				profile = res.data;
				return axios.get(`/articles/user/${res.data.id}`);
			})
			.then(res => {
				console.log(res);
				console.log("profile ", profile);
				profile.total = res.data.total;
				return axios.get(`/articles/${id}/comments`);
			})
			.then(res => {
				console.log(res.data);
				comments = res.data;
				this.setState({ article: article, profile: profile, comments: comments });
				return axios.get(`/users/${comments.user_id}`);
			})
			.then(res => {})
			.catch(err => {
				console.log("Error ", err);
			});
	}
	commentHandler = (event, id) => {
		this.props.history.push(`/profiles/${id}`);
		window.scrollTo({ top: "0" });
	};
	commentSubmitHandler = event => {
		event.preventDefault();
		//axios.then
		const comments = this.state.comments.slice();
		comments.push({
			id: comments.length,
			profile: {
				id: comments[comments.length - 1].id + 1,
				name: "Anvar_AKA",
				photo: ProfilePhoto,
				text: this.state.commentForm.comment.value
			}
		});
		this.setState({ comments: comments });
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
		const image = this.state.article ? (
			<MainImage src={this.state.article.image} alt={this.state.article.title} />
		) : (
			"Wait"
		);
		const article = this.state.article ? (
			<Paper blank article>
				<Header color="#333" mb h2>
					{this.state.article.title}
				</Header>
				<Text textStyle={{ lineHeight: "40px" }}>{this.state.article.body}</Text>
			</Paper>
		) : (
			"Wait"
		);
		const profile = this.state.profile ? (
			<ProfileCard
				clicked={this.viewProfileHandler}
				lang={this.state.lang}
				profile={this.state.profile}
				viewProfile
			/>
		) : (
			"Wait"
		);
		const comments = (
			<Comments
				commentForm={this.state.commentForm}
				commentClicked={this.commentHandler}
				commentSubmitted={this.commentSubmitHandler}
				commentChanged={this.commentChangedHandler}
				comments={this.state.comments}
			/>
		);
		return (
			<React.Fragment>
				<Grid container mbbig="true">
					{image}
				</Grid>
				<Grid container con="true" spacing={5}>
					<Grid item sm={1} />
					<Grid item sm={7}>
						{article}
						{comments}
					</Grid>
					<Grid item sm={3} xs={12}>
						{profile}
					</Grid>
					<Grid item sm={1} />
				</Grid>
			</React.Fragment>
		);
	}
}

export default ArticlePage;
