import React from "react";
import classes from "./Button.module.css";

const button = props => {
  const buttonClasses = [
    classes.Button,
    props.buttonClass ? classes[props.buttonClass] : null,
    props.buttonAddClass ? classes[props.buttonAddClass] : null,
    props.round ? classes.Round : null,
    props.grey ? classes.Grey : null,
    props.white ? classes.White : null,
    props.accent ? classes.Accent : null,
    props.sharp ? classes.Sharp : null,
    props.flatten ? classes.Flatten : null,
    props.padding ? classes.Padding : null
  ];
  return (
    <button
      className={buttonClasses.join(" ")}
      style={props.buttonStyle}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default button;
