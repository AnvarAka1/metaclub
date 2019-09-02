import React from "react";
import classes from "./Card.module.css";

const card = props => {
  const cardClasses = [
    classes.Card,
    props.bb ? classes.BorderBottom : null,
    props.scroll ? classes.Scroll : null,
    props.accent ? classes.AccentGradient : null,
    props.server ? classes.Server : null,
    props.mb ? classes.MarginBottom : null,
    props.comment ? classes.Comment : null
  ];
  return (
    <div
      style={{ backgroundColor: props.color ? props.color : null }}
      className={cardClasses.join(" ")}
    >
      {props.children}
    </div>
  );
};

export default card;
