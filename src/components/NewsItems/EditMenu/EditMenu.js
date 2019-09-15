import React from "react";
import classes from "./EditMenu.module.css";
import EditIcon from "../../../assets/images/icons/edit.png";
import RmvIcon from "../../../assets/images/icons/remove.png";
const editMenu = props => {
	return (
		<div className={classes.EditMenu}>
			<img src={EditIcon} onClick={props.editClicked} alt={"Edit"} />
			<img src={RmvIcon} onClick={props.removeClicked} alt={"Edit"} />
		</div>
	);
};

export default editMenu;
