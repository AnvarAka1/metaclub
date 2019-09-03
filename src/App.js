import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import Layout from "./containers/Layout/Layout";
import AboutPage from "./containers/AboutPage/AboutPage";
import FaqPage from "./containers/FaqPage/FaqPage";
import ArticlesPage from "./containers/ArticlesPage/ArticlesPage";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import Mhc from "./containers/Mhc/Mhc";
import ArticlePage from "./containers/ArticlePage/ArticlePage";
const cookies = new Cookies();
class App extends Component {
  state = {
    footerForm: {
      name: {
        inputType: "input",
        config: {
          name: "name",
          placeholder: "Ваше имя",
          type: "text"
        },
        grid: {
          sm: 6,
          xs: 12
        },
        value: ""
      },
      email: {
        inputType: "input",
        config: {
          name: "email",
          placeholder: "Ваша эл.почта",
          type: "email"
        },
        grid: {
          sm: 6,
          xs: 12
        },
        value: ""
      },
      text: {
        inputType: "textarea",
        config: {
          name: "message",
          placeholder: "Отзыв / Вопрос / Предложение",

          type: "text"
        },
        grid: {
          sm: 12,
          xs: 12
        },
        value: ""
      }
    },
    lang: 0,
    isLangHover: false,
    drawerLeft: false
  };

  componentDidMount() {
    const lang = cookies.get("lang");
    console.log("State is", this.state.lang);
    console.log("cookie is", lang);
    // set placeholders
    if (lang !== "undefined") {
      console.log("Lang is set");
    }
    if (lang !== this.state.lang && lang !== "undefined") {
      this.setState({ lang: lang });
    }
  }
  navigationHandler = (event, id) => {
    if (id) {
      this.props.history.push("/about/id");
      // window.top(id);
    }
  };
  langHandler = () => {
    const titles = {
      name: ["Ваше имя", "Your name"],
      email: ["Ваша эл.почта", "Your email"],
      text: ["Отзыв / Вопрос / Предложение", "Message"]
    };
    console.log("Cookie lang is ", cookies.getAll());
    console.log("LANG is ", this.state.lang);
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
    console.log("Opened");
    this.setState({ drawerLeft: true });
  };
  closeDrawerHandler = () => {
    console.log("Closed");
    this.setState({ drawerLeft: false });
  };
  inputChangeHandler = (event, inputIdentifier) => {
    const footerForm = {
      ...this.state.footerForm
    };
    footerForm[inputIdentifier].value = event.target.value;
    this.setState({ footerForm: footerForm });
  };
  footerFormSubmitHandler = event => {
    event.preventDefault();
    // axios
  };
  testHandler = () => {
    const date = new Date("2099");
    console.log(date);
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
            <Route path="/mhc" component={Mhc} />
            <Redirect from="*" to="/about" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
