import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import AboutPage from "./containers/AboutPage/AboutPage";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
class App extends Component {
  state = {
    lang: 0,
    isLangHover: false
  };
  langHoverHandler = () => {
    this.setState({
      isLangHover: true
    });
  };
  langUnhoverHandler = () => {
    this.setState({
      isLangHover: false
    });
  };
  langChangeHandler = (event, id) => {
    this.setState({
      lang: id
    });
  };
  render() {
    return (
      <div className="App">
        <Layout
          lang={this.state.lang}
          isLangHover={this.state.isLangHover}
          langHover={this.langHoverHandler}
          langChange={this.langChangeHandler}
          langUnhover={this.langUnhoverHandler}
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
