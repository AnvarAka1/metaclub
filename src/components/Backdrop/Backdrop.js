import React from "react";
import classes from "./Backdrop.module.css";
const backdrop = props => {
	return (
		<div onClick={props.clicked && props.clicked} className={classes.Backdrop}>
			{props.children}
		</div>
	);
};

export default backdrop;
