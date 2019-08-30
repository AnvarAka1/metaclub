import React from "react";
import classes from "./Card.module.css";

const card = props => {
  const cardClasses = [
    classes.Card,
    props.bb ? classes.BorderBottom : null,
    props.scroll ? classes.Scroll : null
  ];
  return <div className={cardClasses.join(" ")}>{props.children}</div>;
};

export default card;
