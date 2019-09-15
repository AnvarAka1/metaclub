import React from "react";
import Header from "../UI/Header/Header";
import classes from "./AskMenu.module.css";
import Button from "../UI/Button/Button";
function askMenu(props) {
	const content = {
		header: [ "Вы уверены?", "Are you sure?" ],
		yBtn: [ "Да", "Yes" ],
		nBtn: [ "Нет", "No" ]
	};
	return (
		<div className={classes.AskMenu}>
			<Header h4 center>
				{content.header[props.lang]}
			</Header>
			<div className={classes.Buttons}>
				<Button wide rounded clicked={props.yClicked}>
					<Header color="white" h5>
						{content.yBtn[props.lang]}
					</Header>
				</Button>
				<Button wide rounded white clicked={props.nClicked}>
					<Header color="#7146ce" h5>
						{content.nBtn[props.lang]}
					</Header>
				</Button>
			</div>
		</div>
	);
}

export default askMenu;
