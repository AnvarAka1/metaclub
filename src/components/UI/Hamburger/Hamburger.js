import React from "react";
import classes from "./Hamburger.module.css";
const hamburger = props => {
  return (
    <div
      className={classes.Hamburger}
      onClick={props.clicked ? props.clicked : null}
    >
      <div></div>
      <div className={classes.Center}></div>
      <div></div>
    </div>
  );
};

export default hamburger;
