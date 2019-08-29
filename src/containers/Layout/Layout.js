import React, { Component } from "react";
import classes from "./Layout.module.css";
import AppBar from "../../components/Navigation/AppBar/AppBar";
import Footer from "../../components/Footer/Footer";
class Layout extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        <AppBar
          lang={this.props.lang}
          langChange={this.props.langChange}
          isLangHover={this.props.isLangHover}
          langHover={this.props.langHover}
          langUnhover={this.props.langUnhover}
        ></AppBar>
        {this.props.children}
        <Footer></Footer>
      </div>
    );
  }
}

export default Layout;
