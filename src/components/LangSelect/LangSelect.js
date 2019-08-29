import React from "react";
import classes from "./LangSelect.module.css";
import EnIcon from "../../assets/images/lang.png";

const langSelect = props => {
  // const langs = [
  //   { id: 0, title: "Ru", image: null },
  //   { id: 1, title: "En", image: null }
  // ];

  return (
    <div className={classes.LangSelect} onClick={props.langClicked}>
      <img src={EnIcon} alt={"lang"}></img>
    </div>
  );
};

export default langSelect;
