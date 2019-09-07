import React from "react";
import Logo from "../../assets/images/logo.png";
import classes from "./Logo.module.css";

const logo = props => {
	return <img className={[ classes.Logo, props.vertical && classes.Vertical ].join(" ")} src={Logo} alt="Logo" />;
};

export default logo;
