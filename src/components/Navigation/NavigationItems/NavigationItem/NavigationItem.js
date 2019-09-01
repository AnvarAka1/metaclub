import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";
const navigationItem = props => {
  const navigationItemClasses = [
    classes.NavigationItem,
    props.vertical ? classes.Vertical : classes.Horizontal
  ];
  return (
    <li className={navigationItemClasses.join(" ")}>
      <NavLink
        to={props.link}
        activeClassName={
          props.vertical ? classes.ActiveSideDrawerLink : classes.ActiveLink
        }
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
