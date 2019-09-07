import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import Layout from "./containers/Layout/Layout";
import AboutPage from "./containers/AboutPage/AboutPage";
import FaqPage from "./containers/FaqPage/FaqPage";
import ArticlesPage from "./containers/ArticlesPage/ArticlesPage";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import MhcPage from "./containers/MhcPage/MhcPage";
import ArticlePage from "./containers/ArticlePage/ArticlePage";
import ContactsPage from "./containers/ContactsPage/Contacts";
const cookies = new Cookies();
class App extends Component {
	state = {
		lang: 0,
		isLangHover: false,
		drawerLeft: false
	};

	componentDidMount() {
		const lang = cookies.get("lang");
		// console.log("typeof lang", typeof lang);
		// console.log("lang", lang);
		// set placeholders
		if (lang !== this.state.lang && typeof lang !== "undefined") {
			this.setState({ lang: lang });
		}
		// console.log("state lang", this.state.lang);
	}
	navigationHandler = (event, id) => {
		if (id) {
			this.props.history.push("/about/id");
			// window.top(id);
		}
	};
	langHandler = () => {
		const titles = {
			name: [ "Ваше имя", "Your name" ],
			email: [ "Ваша эл.почта", "Your email" ],
			text: [ "Отзыв / Вопрос / Предложение", "Message" ]
		};

		const langs = 2;
		const form = { ...this.state.footerForm };
		const nextLang = (this.state.lang + 1) % langs;
		// eslint-disable-next-line
		for (let e in form) {
			form[e].config.placeholder = titles[e][nextLang];
		}

		this.setState(prevState => {
			return {
				lang: (prevState.lang + 1) % langs,
				footerForm: form
			};
		});
		const date = new Date("2099");

		cookies.set("lang", nextLang, { expires: date });
	};
	openDrawerHandler = () => {
		this.setState({ drawerLeft: true });
	};
	closeDrawerHandler = () => {
		this.setState({ drawerLeft: false });
	};

	testHandler = () => {
		const date = new Date("2099");

		cookies.set("something", "hello", {
			expires: date
		});
	};
	render() {
		return (
			<div className="App">
				<Layout
					navigationClicked={this.navigationHandler}
					lang={this.state.lang}
					langClicked={this.langHandler}
					drawerOpened={this.openDrawerHandler}
					drawerClosed={this.closeDrawerHandler}
					drawerLeft={this.state.drawerLeft}
					toggleDrawer={this.toggleDrawerHandler}
					footerForm={this.state.footerForm}
					inputChanged={this.inputChangeHandler}
					formSubmitted={this.footerFormSubmitHandler}
				>
					<Switch>
						<Route path="/faq" component={FaqPage} />
						<Route path="/about" component={AboutPage} />
						<Route path="/articles/:id" component={ArticlePage} />
						<Route path="/articles" component={ArticlesPage} />
						<Route path="/profiles/:id" component={ProfilePage} />
						<Route path="/mhc" component={MhcPage} />
						<Route path="/contacts" component={ContactsPage} />
						<Redirect from="*" to="/about" />
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default withRouter(App);
