import React from "react";
import classes from "./NavigationItem.module.css";
// import { NavLink } from "react-router-dom";
import { NavHashLink as NavLink } from "react-router-hash-link";
const navigationItem = props => {
	const navigationItemClasses = [ classes.NavigationItem, props.vertical ? classes.Vertical : classes.Horizontal ];

	return (
		<li className={navigationItemClasses.join(" ")}>
			<NavLink
				scroll={e => e.scrollIntoView({ behavior: "smooth", block: "start" })}
				onClick={props.drawerClosed}
				to={props.link}
				activeClassName={props.vertical ? classes.ActiveSideDrawerLink : classes.ActiveLink}
			>
				{props.children}
			</NavLink>
		</li>
	);
};

export default navigationItem;
