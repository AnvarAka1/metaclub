import React, { Component } from "react";
import Grid from "../../components/Grid/Grid";
import Header from "../../components/UI/Header/Header";
import HorizontalButtons from "../../components/HorizontalButtons/HorizontalButtons";
// import Spinner from "../../components/Spinner/Spinner";
// import RichTextInput from "aor-rich-text-input";
// import NewsItems from "../../components/NewsItems/NewsItems";
import { Switch, Route } from "react-router-dom";
import Settings from "./Settings/Settings";
import Articles from "./Articles/Articles";
import AddArticle from "./AddArticle/AddArticle";
export class ProfileSettingsPage extends Component {
	state = {
		input: {
			value: "",
			onChange: this.inputChange
		},
		profile: null,
		articles: null,
		selected: 0,
		loading: false
	};
	componentDidMount() {}
	buttonHandler = (event, id) => {
		event.preventDefault();
		this.setState({ selected: id });
		console.log(this.props.match);
		const current = this.props.match.path;
		this.props.history.replace(`${current}/${id}`);
	};
	inputChangeHandler = (event, value) => {
		this.setState({ ...this.state.input, value: event.target.value });
	};
	render() {
		// let newsItems = null;
		// let spinner = <Spinner />;
		const buttons = [
			{ id: 0, title: "Information" },
			{ id: 1, title: "Articles" },
			{ id: 2, title: "Add article" }
		];
		const paths = buttons.map(button => {
			return `${this.props.match.path}/${button.id}`;
		});

		// const addArticle = <RichTextInput source="body" input={this.state.input} />;
		// if (!this.state.loading) {
		// 	spinner = null;
		// 	newsItems = this.state.articles && <NewsItems wide news={this.state.articles} />;
		// }
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
						{/* {spinner} */}
					</Grid>

					<Switch>
						<Route path={paths[1]} component={Articles} />
						<Route path={paths[2]} component={AddArticle} />
						<Route path={`${this.props.match.path}/`} component={Settings} />
					</Switch>
				</Grid>
			</Grid>
		);
	}
}

export default ProfileSettingsPage;
