import React from "react";
import classes from "./HorizontalButtons.module.css";
import Button from "../UI/Button/Button";
const horizontalButtons = props => {
	const { buttons } = props;
	const horizontalButtons = buttons.map(button => {
		return (
			<Button
				key={button.id}
				buttonClass={props.selected !== button.id ? "Transparent" : "Active"}
				semirounded
				clicked={event => props.clicked(event, button.id)}
			>
				{button.title[props.lang]}
			</Button>
		);
	});
	return <div className={classes.HorizontalButtons}>{horizontalButtons}</div>;
};

export default horizontalButtons;
