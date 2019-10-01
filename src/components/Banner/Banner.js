import React from "react";
import classes from "./Banner.module.css";
const banner = props => {
	return (
		<div className={classes.Banner}>
			<a href={props.banner.link} target="_blank" rel="noopener noreferrer">
				<img src={props.banner.src} alt={props.banner.title} />
			</a>
		</div>
	);
};

export default banner;
