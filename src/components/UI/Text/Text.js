import React from "react";
import classes from "./Text.module.css";

const text = props => {
	const textClasses = [
		classes.Text,
		classes[props.textClass],
		props.transition ? classes.Transition : null,
		props.thin ? classes.Thin : null,
		props.thick ? classes.Thick : null,
		props.normal ? classes.Normal : null,
		props.hasLine ? classes.Line : null,
		props.mtb ? classes.Margin : null,
		props.mtbBig ? classes.MarginBig : null,
		props.mt ? classes.MarginTop : null,
		props.mbBig ? classes.MarginBottomBig : null,
		props.part ? classes.Part : null,
		props.small ? classes.Small : null
	];
	const textStyles = {
		...props.textStyle,
		color: props.color ? props.color : "#777",
		fontSize: props.size ? props.size : null
	};
	return (
		<p onClick={props.clicked ? props.clicked : null} className={textClasses.join(" ")} style={textStyles}>
			{props.children}
		</p>
	);
};

export default text;
