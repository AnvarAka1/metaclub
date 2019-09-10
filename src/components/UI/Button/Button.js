import React from "react";
import classes from "./Button.module.css";

const button = props => {
	const buttonClasses = [
		classes.Button,
		props.buttonClass && classes[props.buttonClass],
		props.buttonAddClass && classes[props.buttonAddClass],
		props.round && classes.Round,
		props.grey && classes.Grey,
		props.white && classes.White,
		props.accent && classes.Accent,
		props.transparent && classes.Transparent,
		props.sharp && classes.Sharp,
		props.flatten && classes.Flatten,
		props.padding && classes.Padding,
		props.wide && classes.Wide,
		props.big && classes.Big
	];
	return (
		<button
			className={buttonClasses.join(" ")}
			disabled={props.disabled}
			style={props.buttonStyle}
			onClick={props.clicked}
		>
			{props.children}
		</button>
	);
};

export default button;
