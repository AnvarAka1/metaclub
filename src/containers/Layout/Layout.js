import React, { Component } from "react";
import classes from "./Layout.module.css";
import Drawer from "@material-ui/core/Drawer";
import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems";
import Footer from "../../components/Footer/Footer";
import Hidden from "@material-ui/core/Hidden";
class Layout extends Component {
  render() {
    return (
      <div className={[classes.Layout].join(" ")}>
        <NavigationItems
          navigationClicked={this.props.navigationClicked}
          lang={this.props.lang}
          langClicked={this.props.langClicked}
          drawerOpened={this.props.drawerOpened}
        />
        <Hidden mdUp>
          <Drawer
            open={this.props.drawerLeft}
            anchor="right"
            onClose={this.props.toggleDrawer}
          >
            <NavigationItems
              navigationClicked={this.props.navigationClicked}
              lang={this.props.lang}
              vertical
              drawerClosed={this.props.drawerClosed}
            ></NavigationItems>
          </Drawer>
        </Hidden>
        <div className={classes.Container}>{this.props.children}</div>
        <Footer
          lang={this.props.lang}
          footerForm={this.props.footerForm}
          inputChanged={this.props.inputChanged}
          submitted={this.props.formSubmitted}
        ></Footer>
      </div>
    );
  }
}

export default Layout;
