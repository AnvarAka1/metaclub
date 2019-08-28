import React from "react";
import classes from "./LangSelect.module.css";
import EnIcon from "../../assets/images/lang.png";

const langSelect = props => {
  const langs = [
    { id: 0, title: "Ru", image: null },
    { id: 1, title: "En", image: null },
    { id: 2, title: "Uz", image: null }
  ];
  const languages = langs.map(lang => {
    return (
      <li key={lang.id} onClick={event => props.langChange(event, lang.id)}>
        <p>{lang.title}</p>
      </li>
    );
  });
  return (
    <div
      className={classes.LangSelect}
      onMouseOver={props.langHover}
      onMouseLeave={props.langUnhover}
    >
      <img src={EnIcon} alt={"lang"}></img>
      <ul
        className={classes.Ul}
        style={{ display: props.isLangHover ? "block" : "none" }}
      >
        {languages}
      </ul>
    </div>
  );
};

export default langSelect;
