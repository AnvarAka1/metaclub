import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
// import Cookies from "universal-cookie";
import Layout from "./containers/Layout/Layout";
import AboutPage from "./containers/AboutPage/AboutPage";
import FaqPage from "./containers/FaqPage/FaqPage";
import ArticlesPage from "./containers/ArticlesPage/ArticlesPage";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import MhcPage from "./containers/MhcPage/MhcPage";
import ArticlePage from "./containers/ArticlePage/ArticlePage";
import ContactsPage from "./containers/ContactsPage/ContactsPage";
import ProfileSettingsPage from "./containers/ProfileSettingsPage/ProfileSettingsPage";
import NodesPage from "./containers/NodesPage/NodesPage";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import ForgotPassPage from "./containers/ForgotPassPage/ForgotPassPage";
import ResetPassPage from "./containers/ResetPassPage/ResetPassPage";

// const cookies = new Cookies();
class App extends Component {
	constructor(props) {
		super(props);
		this.props.onAuthCheck();
	}

	componentDidMount() {
		this.props.onLangInit();
	}

	render() {
		let routers = (
			<Switch>
				<Route path="/faq" component={FaqPage} />
				<Route path="/about" component={AboutPage} />
				<Route path="/articles/:id" component={ArticlePage} />
				<Route path="/articles" component={ArticlesPage} />
				<Route path="/users/:id" component={ProfilePage} />
				<Route path="/mhc" component={MhcPage} />
				<Route path="/contacts" component={ContactsPage} />
				<Route path="/nodes" component={NodesPage} />
				{!this.props.isAuthorized && <Route path="/forgot" component={ForgotPassPage} />}
				{!this.props.isAuthorized && <Route path="/newpassword" component={ResetPassPage} />}
				{this.props.isAuthorized && <Route path="/settings" component={ProfileSettingsPage} />}
				<Redirect from="*" to="/about" />
			</Switch>
		);

		return (
			<div className="App">
				<Layout
					navigationClicked={this.navigationHandler}
					lang={this.props.lang}
					langClicked={this.props.onLangChange}
				>
					{routers}
				</Layout>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		isAuthorized: state.auth.token != null,
		role: state.auth.role,
		lang: state.lang.lang
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuthCheck: () => dispatch(actions.authCheckState()),
		onLangInit: () => dispatch(actions.langInit()),
		onLangChange: () => dispatch(actions.langChange())
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
