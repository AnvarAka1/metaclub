import React, { Component } from "react";
import NewsItems from "../../components/NewsItems/NewsItems";
import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import Grid from "../../components/Grid/Grid";
import axios from "../../axios-db";
export class ProfilePage extends Component {
	state = {
		profile: null,
		articles: null,
		lang: 0
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
				console.log(res);
				console.log("profile ", profile);
				profile.total = res.data.total;
				return axios.get(`/articles/user/${profile.id}`);
			})
			.then(res => {
				console.log(res.data);
				articles = res.data.data;
				this.setState({ profile: profile, articles: articles });
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
	render() {
		const profile = this.state.profile ? (
			<ProfileCard lang={this.state.lang} profile={this.state.profile} />
		) : (
			"Wait"
		);
		const articles = this.state.articles ? (
			<NewsItems articleClicked={this.articleHandler} news={this.state.articles} wide />
		) : (
			"Wait"
		);
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

export default ProfilePage;
