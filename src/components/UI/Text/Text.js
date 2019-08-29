import React from "react";
import classes from "./Text.module.css";

const text = props => {
  const textClasses = [
    classes.Text,
    classes[props.textClass],
    props.thin ? classes.Thin : null,
    props.thick ? classes.Thick : null,
    props.normal ? classes.Normal : null,
    props.hasLine ? classes.Line : null,
    props.mtb ? classes.Margin : null,
    props.mbBig ? classes.MarginBottomBig : null,
    props.part ? classes.Part : null
  ];
  return <p className={textClasses.join(" ")}>{props.children}</p>;
};

export default text;
