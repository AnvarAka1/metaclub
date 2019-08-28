import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./AppBar.module.css";

const appBar = props => {
  return (
    <nav>
      <div className={classes.AppBar}>
        <NavigationItems
          lang={props.lang}
          langChange={props.langChange}
          isLangHover={props.isLangHover}
          langHover={props.langHover}
          langUnhover={props.langUnhover}
        ></NavigationItems>
      </div>
    </nav>
  );
};

export default appBar;
