import React from "react";
import classes from "./NavigationItems.module.css";
import { NavLink } from "react-router-dom";

import Logo from "../../../assets/images/logo.png";
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
  console.log(navItems.buttons);
  const buttons = navItems.buttons.map(button => {
    return (
      <Button key={button.title} {...button.type} clicked={button.clicked}>
        {button.title}
      </Button>
    );
  });

  // return statement
  return (
    <Grid con container justify="center">
      <ul className={classes.NavigationItems}>
        {/* Logo */}
        <li>
          <NavLink to="/">
            <img src={Logo} alt={"Logo"}></img>
          </NavLink>
        </li>
        {/* navigation */}
        {navigationItems}
        {/* Sign In and Reg */}
        {buttons}
        {/* Language selector */}
        <LangSelect
          lang={props.lang}
          langChange={props.langChange}
          isLangHover={props.isLangHover}
          langHover={props.langHover}
          langUnhover={props.langUnhover}
        ></LangSelect>
      </ul>
    </Grid>
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
        link: "/"
      },
      { title: ["Калькулятор", "Calculator", "UzUzCalculator"], link: "/" },
      { title: ["Ноды", "Nodes", "UzNodes"], link: "/" },
      { title: ["Статьи", "Articles", "UzArticles"], link: "/" },
      { title: ["F.A.Q", "F.A.Q", "UzF.A.Q"], link: "/" },
      { title: ["Контакты", "Contacts", "UzContacts"], link: "/" }
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
