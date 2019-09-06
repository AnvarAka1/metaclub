import React from "react";
import classes from "./LangSelect.module.css";
import EnIcon from "../../assets/images/langEn.png";
import RuIcon from "../../assets/images/langRu.png";

const langSelect = props => {
	// const langs = [
	//   { id: 0, title: "Ru", image: null },
	//   { id: 1, title: "En", image: null }
	// ];
	// console.log("Lang is currently = ", typeof props.lang);
	return (
		<div className={classes.LangSelect} onClick={props.langClicked}>
			{/* eslint-disable-next-line*/}
			<img src={props.lang == "1" ? EnIcon : RuIcon} alt={"lang"} />
		</div>
	);
};

export default langSelect;
