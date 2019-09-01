import React from "react";
import classes from "./Text.module.css";

const text = props => {
  const textClasses = [
    classes.Text,
    classes[props.textClass],
    props.transition ? classes.Transition : null,
    props.thin ? classes.Thin : null,
    props.thick ? classes.Thick : null,
    props.normal ? classes.Normal : null,
    props.hasLine ? classes.Line : null,
    props.mtb ? classes.Margin : null,
    props.mtbBig ? classes.MarginBig : null,
    props.mt ? classes.MarginTop : null,
    props.mbBig ? classes.MarginBottomBig : null,
    props.part ? classes.Part : null
  ];
  return (
    <p
      className={textClasses.join(" ")}
      style={{
        color: props.color ? props.color : "#777",
        fontSize: props.size ? props.size : null
      }}
    >
      {props.children}
    </p>
  );
};

export default text;
