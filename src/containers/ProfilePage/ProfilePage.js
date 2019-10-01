import React, { Component } from "react";
import NewsItems from "../../components/NewsItems/NewsItems";
import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import Grid from "../../components/Grid/Grid";
import axios from "../../axios-db";
import Spinner from "../../components/Spinner/Spinner";
import { connect } from "react-redux";
export class ProfilePage extends Component {
	state = {
		profile: null,
		articles: null,
		lang: 0,
		loading: true
	};

	componentDidMount() {
		const { id } = this.props.match.params;
		let profile = null;
		let articles = null;
		axios
			.get(`/users/${id}`)
			.then(res => {
				profile = res.data;
				return axios.get(`/articles/user/${res.data.id}`);
			})
			.then(res => {
				profile.total = res.data.total;
				return axios.get(`/articles/user/${profile.id}`);
			})
			.then(res => {
				console.log(res.data);
				articles = res.data;
				this.setState({ profile: profile, articles: articles, loading: false });
			})
			.catch(err => {
				console.log(err);
			});
	}
	articleHandler = (event, id) => {
		event.preventDefault();
		this.props.history.push(`/articles/${id}`);
		window.scrollTo({ top: "0" });
	};
	pageClickHandler = (event, id) => {
		event.preventDefault();
		console.log(this.props.match.params.id);
		axios.get(`/articles/user/${this.props.match.params.id}?page=${id}`).then(res => {
			this.setState({ articles: res.data });
		});
	};
	render() {
		let profile = <Spinner />;
		let articles = <Spinner />;
		if (!this.state.loading) {
			profile = this.state.profile && <ProfileCard lang={this.state.lang} profile={this.state.profile} />;
			articles = this.state.articles && (
				<NewsItems
					half
					lang={this.props.lang}
					articleClicked={this.articleHandler}
					pageClicked={this.pageClickHandler}
					news={this.state.articles}
					// wide
				/>
			);
		}
		return (
			<React.Fragment>
				<Grid item xs={12} mt="true">
					<Grid container con="true" spacing={5}>
						<Grid item sm={5} md={3} xs={12}>
							{profile}
						</Grid>
						<Grid item md={8} sm={7} xs={12}>
							<Grid container spacing={5}>
								{articles}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}
const mapStateToProps = state => {
	return {
		lang: state.lang.lang
	};
};

export default connect(mapStateToProps)(ProfilePage);
