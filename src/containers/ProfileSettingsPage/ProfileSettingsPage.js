import React, { Component } from "react";
import Grid from "../../components/Grid/Grid";
import Header from "../../components/UI/Header/Header";
import HorizontalButtons from "../../components/HorizontalButtons/HorizontalButtons";
import axios from "../../axios-db";
import Spinner from "../../components/Spinner/Spinner";
import RichTextInput from "aor-rich-text-input";
import NewsItems from "../../components/NewsItems/NewsItems";
export class ProfileSettingsPage extends Component {
	state = {
		input: {
			value: "",
			onChange: this.inputChange
		},
		profile: null,
		articles: null,
		selected: 0,
		loading: true
	};
	componentDidMount() {}
	buttonHandler = (event, id) => {
		event.preventDefault();
		this.setState({ selected: id });
		const auth = "Bearer " + localStorage.getItem("token");
		switch (id) {
			case 0:
				// axios.get();
				break;
			case 1:
				this.setState({ loading: true });
				axios
					.get("/articles/user", {
						headers: {
							Authorization: auth
						}
					})
					.then(res => {
						this.setState({ articles: res.data.data, loading: false });
					})
					.catch(err => console.log(err));
				break;
			case 2:
				this.setState({ profile: null, articles: null, loading: false });
				break;
			default:
				// axios.get();
				break;
		}
	};
	inputChangeHandler = (event, value) => {
		this.setState({ ...this.state.input, value: event.target.value });
	};
	render() {
		let newsItems = null;
		let spinner = <Spinner />;
		const buttons = [
			{ id: 0, title: "Information" },
			{ id: 1, title: "Articles" },
			{ id: 2, title: "Add article" }
		];

		const addArticle = <RichTextInput source="body" input={this.state.input} />;
		if (!this.state.loading) {
			spinner = null;
			newsItems = this.state.articles && <NewsItems wide news={this.state.articles} />;
		}
		return (
			<Grid item xs={12} mt="true">
				<Grid container con="true" spacing={5}>
					<Grid item xs={12}>
						<Header h3 center>
							Settings
						</Header>
					</Grid>
					<Grid item xs={12}>
						<HorizontalButtons
							selected={this.state.selected}
							buttons={buttons}
							clicked={this.buttonHandler}
						/>
					</Grid>
					<Grid item xs={12}>
						{spinner}
					</Grid>
					<Grid item xs={12} sm={4}>
						{/* image */}
					</Grid>
					<Grid item xs={12} sm={8}>
						{newsItems}
						{addArticle}
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default ProfileSettingsPage;
