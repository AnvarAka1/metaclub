import React from "react";
import classes from "./LangSelect.module.css";
import EnIcon from "../../assets/images/langEn.png";
import RuIcon from "../../assets/images/langRu.png";

const langSelect = props => {
	return (
		<div className={classes.LangSelect} onClick={props.langClicked}>
			{/* eslint-disable-next-line*/}
			<img src={props.lang == "1" ? EnIcon : RuIcon} alt={"lang"} />
		</div>
	);
};

export default langSelect;
