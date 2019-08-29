import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import AboutPage from "./containers/AboutPage/AboutPage";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

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
    drawerLeft: true
  };
  componentDidMount() {
    // set placeholders
  }
  toggleDrawerHandler = () => {
    this.setState({ drawerLeft: false });
  };
  langHandler = () => {
    const titles = {
      name: ["Ваше имя", "Your name"],
      email: ["Ваша эл.почта", "Your email"],
      text: ["Отзыв / Вопрос / Предложение", "Message"]
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
  render() {
    return (
      <div className="App">
        <Layout
          lang={this.state.lang}
          langClicked={this.langHandler}
          drawerLeft={this.state.drawerLeft}
          toggleDrawer={this.toggleDrawerHandler}
          footerForm={this.state.footerForm}
          inputChanged={this.inputChangeHandler}
          formSubmitted={this.footerFormSubmitHandler}
        >
          <Switch>
            <Route path="/" component={AboutPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
