import React from "react";
import classes from "./Header.module.css";
const header = props => {
  const headerClasses = [
    classes.Header,
    classes[props.headerClass],
    props.thin ? classes.Thin : null,
    props.thick ? classes.Thick : null,
    props.normal ? classes.Normal : null
  ];
  const headerStyle = props.headerStyle;
  let header = null;
  if (props.h1) {
    header = (
      <h1 className={headerClasses.join(" ")} style={headerStyle}>
        {props.children}
      </h1>
    );
  } else if (props.h2) {
    header = (
      <h2 className={headerClasses.join(" ")} style={headerStyle}>
        {props.children}
      </h2>
    );
  } else if (props.h3) {
    header = (
      <h3 className={headerClasses.join(" ")} style={headerStyle}>
        {props.children}
      </h3>
    );
  } else if (props.h4) {
    header = (
      <h4 className={headerClasses.join(" ")} style={headerStyle}>
        {props.children}
      </h4>
    );
  } else if (props.h5) {
    header = (
      <h5 className={headerClasses.join(" ")} style={headerStyle}>
        {props.children}
      </h5>
    );
  } else {
    header = (
      <h6 className={headerClasses.join(" ")} style={headerStyle}>
        {props.children}
      </h6>
    );
  }
  return <>{header}</>;
};

export default header;
