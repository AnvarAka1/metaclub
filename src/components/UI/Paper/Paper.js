import React from "react";
import classes from "./Paper.module.css";
const paper = props => {
  const paperClasses = [classes.Paper, props.blank ? classes.Blank : null];
  return <div className={paperClasses.join(" ")}>{props.children}</div>;
};

export default paper;
