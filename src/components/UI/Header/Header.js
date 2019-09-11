import React from "react";
import classes from "./Header.module.css";
const header = props => {
	const headerClasses = [
		classes.Header,
		classes[props.headerClass],
		props.pointer ? classes.Pointer : null,
		props.accent ? classes.Accent : null,
		props.white ? classes.White : null,
		props.green ? classes.Green : null,
		props.light ? classes.Light : null,
		props.thin ? classes.Thin : null,
		props.thick ? classes.Thick : null,
		props.normal ? classes.Normal : null,
		props.hasLine ? classes.Line : null,
		props.mtb ? classes.Margin : null,
		props.mtbBig ? classes.MarginBig : null,
		props.mb ? classes.MarginBottom : null,
		props.mbBig ? classes.MarginBottomBig : null,
		props.pb ? classes.PaddingBottom : null,
		props.center ? classes.Center : null
	];
	const headerStyle = {
		...props.headerStyle,
		color: props.color ? props.color : null
	};
	let header = null;
	if (props.h1) {
		header = (
			<h1 onClick={props.clicked ? props.clicked : null} className={headerClasses.join(" ")} style={headerStyle}>
				{props.children}
			</h1>
		);
	} else if (props.h2) {
		header = (
			<h2 onClick={props.clicked ? props.clicked : null} className={headerClasses.join(" ")} style={headerStyle}>
				{props.children}
			</h2>
		);
	} else if (props.h3) {
		header = (
			<h3 onClick={props.clicked ? props.clicked : null} className={headerClasses.join(" ")} style={headerStyle}>
				{props.children}
			</h3>
		);
	} else if (props.h4) {
		header = (
			<h4 onClick={props.clicked ? props.clicked : null} className={headerClasses.join(" ")} style={headerStyle}>
				{props.children}
			</h4>
		);
	} else if (props.h5) {
		header = (
			<h5 onClick={props.clicked ? props.clicked : null} className={headerClasses.join(" ")} style={headerStyle}>
				{props.children}
			</h5>
		);
	} else {
		header = (
			<h6 onClick={props.clicked ? props.clicked : null} className={headerClasses.join(" ")} style={headerStyle}>
				{props.children}
			</h6>
		);
	}
	return <React.Fragment>{header}</React.Fragment>;
};

export default header;
