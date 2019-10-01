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
import { connect } from "react-redux";
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
	componentDidMount() {
		this.setState({
			selected: 0
		});
	}
	buttonHandler = (event, id) => {
		event.preventDefault();
		this.setState({ selected: id });
		const current = this.props.match.path;
		this.props.history.replace(`${current}/${id}`);
	};
	inputChangeHandler = (event, value) => {
		this.setState({ ...this.state.input, value: event.target.value });
	};
	render() {
		// let newsItems = null;
		// let spinner = <Spinner />;
		const content = {
			header: [ "Настройки", "Settings" ]
		};
		const buttons = [
			{ id: 0, title: [ "Добавить статью", "Add article" ] },
			{ id: 1, title: [ "Публикации", "Publications" ] },
			{ id: 2, title: [ "Настройки", "Settings" ] }
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
							{content.header[this.props.lang]}
						</Header>
					</Grid>
					<Grid item xs={12}>
						<HorizontalButtons
							selected={this.state.selected}
							buttons={buttons}
							lang={this.props.lang}
							clicked={this.buttonHandler}
						/>
					</Grid>
					<Grid item xs={12}>
						{/* {spinner} */}
					</Grid>

					<Switch>
						<Route path={paths[1]} component={Articles} />
						<Route path={paths[2]} component={Settings} />
						<Route path={`${this.props.match.path}/`} component={AddArticle} />
					</Switch>
				</Grid>
			</Grid>
		);
	}
}
const mapStateToProps = state => {
	return {
		lang: state.lang.lang
	};
};

export default connect(mapStateToProps)(ProfileSettingsPage);
