import React from "react";
import classes from "./Content.module.css";
import ReactHtmlParser from "react-html-parser";
const content = props => {
	return <div className={classes.Content}>{ReactHtmlParser(props.body)}</div>;
};

export default content;
