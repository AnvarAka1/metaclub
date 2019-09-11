import React from "react";
import Card from "../../UI/Card/Card";
// import classes from "./QuestionCard.module.css";
import Header from "../../UI/Header/Header";
import Text from "../../UI/Text/Text";
import ArrowUpIcon from "../../../assets/images/icons/arrowUp.png";
import ArrowDownIcon from "../../../assets/images/icons/arrowDown.png";
import classes from "./QuestionCard.module.css";
const questionCard = props => {
	const { question_en, question_ru, reply_en, reply_ru } = props.question;
	return (
		<Card bb scroll>
			<Header h5 clicked={props.clicked} pointer>
				<span style={{ verticalAlign: "top" }} className="accent">
					Q:{" "}
				</span>
				<span style={{ width: "85%", display: "inline-block" }}>{props.lang ? question_ru : question_en}</span>
				<span className={classes.Toggler}>
					<img src={props.opened ? ArrowUpIcon : ArrowDownIcon} alt="toggler" />
				</span>
			</Header>
			<Text transition textClass={!props.opened ? "Hidden" : null} mt>
				{props.lang ? reply_ru : reply_en}
			</Text>
		</Card>
	);
};

export default questionCard;
