import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Paper from "../UI/Paper/Paper";
const modal = props => {
	return (
		<div className={classes.ModalWrapper}>
			<Backdrop clicked={props.backdropClicked && props.backdropClicked} />
			<div className={[ classes.Modal, props.fixed && classes.Fixed ].join(" ")}>
				<Paper modal>{props.children}</Paper>
			</div>
		</div>
	);
};

export default modal;
