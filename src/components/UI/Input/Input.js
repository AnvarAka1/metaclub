import React from "react";
import classes from "./Input.module.css";

const input = props => {
  const inputClasses = [
    classes.Input,
    props.serverInput ? classes.Server : null,
    props.elementConfig.inputClass &&
       classes[props.elementConfig.inputClass]
    
  ];
  let input;
  if (props.elementConfig) {
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
      case "range":
        inputClasses.push(classes.Range);
        input = (
          <input
            className={inputClasses.join(" ")}
            {...props.elementConfig.config}
            onChange={props.changed}
            value={props.elementConfig.value}
          ></input>
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
  } else {
    input = "Input";
  }

  return <>{input}</>;
};

export default input;
