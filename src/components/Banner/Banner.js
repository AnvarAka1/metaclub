import React from "react";
import classes from "./Banner.module.css";
const banner = props => {
	return (
		<div className={classes.Banner}>
			<a href={props.banner[0].link} target="_blank" rel="noopener noreferrer">
				<img src={props.banner[0].ad} alt={props.banner[0].title} />
			</a>
		</div>
	);
};

export default banner;
