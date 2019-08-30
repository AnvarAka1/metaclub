import React from "react";
import classes from "./NavigationItems.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../Logo/Logo";
import Hidden from "@material-ui/core/Hidden";
// import Logo from "../../../assets/images/logo.png";
import NavigationItem from "./NavigationItem/NavigationItem";
import Button from "../../UI/Button/Button";
import LangSelect from "../../LangSelect/LangSelect";

import Grid from "../../Grid/Grid";
const navigationItems = props => {
  const navItems = languageSelect(props);
  const navigationItems = navItems.nav.map(navItem => {
    return (
      <NavigationItem key={navItem.title} link={navItem.link}>
        {navItem.title}
      </NavigationItem>
    );
  });
  const buttons = navItems.buttons.map(button => {
    return (
      <Button key={button.title} {...button.type} clicked={button.clicked}>
        {button.title}
      </Button>
    );
  });

  // return statement
  return (
    <nav>
      <div className={classes.AppBar}>
        <Grid con="true" container justify="center">
          <ul className={classes.NavigationItems}>
            {/* Logo */}
            <li>
              <NavLink to="/">
                {/* <img src={Logo} alt={"Logo"}></img> */}
                <Logo></Logo>
              </NavLink>
            </li>
            {/* navigation */}
            <Hidden smDown>{navigationItems}</Hidden>
            {/* Sign In and Reg */}
            <div className={classes.Buttons}>
              {buttons}
              {/* Language selector */}
              <LangSelect
                lang={props.lang}
                langClicked={props.langClicked}
              ></LangSelect>
            </div>
          </ul>
        </Grid>
      </div>
    </nav>
  );
};

// Function gets props, verifies the language selected(state in App.js) and then selects the titles
// for navigation buttons and also for 2 buttons: Sign In and Register
/**@return array with all elements in navigation items in selected language */

const languageSelect = props => {
  const navItemsMulti = {
    nav: [
      {
        title: ["О проекте", "About Project", "UzAbout Project"],
        link: "/about"
      },
      {
        title: [
          "Как зарабатывать МНС?",
          "How to get paid on MHC?",
          "UzHow to get paid on MHC?"
        ],
        link: "/mhc"
      },
      {
        title: ["Калькулятор", "Calculator", "UzUzCalculator"],
        link: "/calculator"
      },
      { title: ["Ноды", "Nodes", "UzNodes"], link: "/nodes" },
      { title: ["Статьи", "Articles", "UzArticles"], link: "/articles" },
      { title: ["F.A.Q", "F.A.Q", "UzF.A.Q"], link: "/faq" },
      { title: ["Контакты", "Contacts", "UzContacts"], link: "/contacts" }
    ],
    buttons: [
      {
        title: ["Войти", "Sign In", "UzSign In"],
        type: { round: true, white: true },
        clicked: props.signClicked
      },
      {
        title: ["Регистрация", "Register", "UzRegister"],
        type: { round: true },
        clicked: props.regClicked
      }
    ]
  };
  const navItems = {};
  navItems.buttons = navItemsMulti.buttons.map(button => {
    return {
      title: button.title[props.lang],
      type: button.type,
      clicked: button.clicked
    };
  });
  navItems.nav = navItemsMulti.nav.map(navItemMulti => {
    return { title: navItemMulti.title[props.lang], link: navItemMulti.link };
  });
  return navItems;
};
export default navigationItems;
