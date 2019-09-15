import React from "react";
import classes from "./Page.module.css";

const page = props => {
	return (
		<div className={[ classes.Page, props.selected ? classes.Active : null ].join(" ")} onClick={props.clicked}>
			{props.children}
		</div>
	);
};

export default page;
