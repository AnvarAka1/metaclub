import React, { Component } from "react";
import classes from "./Layout.module.css";
import Drawer from "@material-ui/core/Drawer";
import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems";
import Footer from "../../components/Footer/Footer";
import Hidden from "@material-ui/core/Hidden";
import Grid from "../../components/Grid/Grid";
class Layout extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        <NavigationItems
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
              lang={this.props.lang}
              vertical
              drawerClosed={this.props.drawerClosed}
            ></NavigationItems>
          </Drawer>
        </Hidden>
        <div className={classes.Container}>
          <Grid con="true" container spacing={3}>
            {this.props.children}
          </Grid>
        </div>
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
