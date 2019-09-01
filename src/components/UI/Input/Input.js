import React from "react";
import classes from "./Input.module.css";

const input = props => {
  const inputClasses = [
    classes.Input,
    props.serverInput ? classes.Server : null
  ];
  let input;
  switch (props.elementConfig.inputType) {
    case "input":
      input = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          value={props.elementConfig.value}
          {...props.elementConfig.config}
        ></input>
      );
      break;
    case "textarea":
      inputClasses.push(classes.Textarea);
      input = (
        <textarea
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig.config}
          value={props.elementConfig.value}
        ></textarea>
      );
      break;
    default:
      input = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          value={props.elementConfig.value}
          {...props.elementConfig.config}
        ></input>
      );
      break;
  }

  return <>{input}</>;
};

export default input;
