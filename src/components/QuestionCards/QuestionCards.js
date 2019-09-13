import React from "react";
import QuestionCard from "./QuestionCard/QuestionCard";
import { NavLink } from "react-router-dom";
import Text from "../UI/Text/Text";
import Card from "../UI/Card/Card";
const questionCards = props => {
	const content = {
		link: [
			"Чтобы поддержать наши усилия, не стесняйтесь пожертвовать деньги",
			"To support our efforts, feel free to donate"
		]
	};
	const questions = props.questionsArray.map(question => {
		return (
			<QuestionCard
				lang={props.lang}
				opened={question.opened}
				clicked={event => props.toggleClicked(event, question.id)}
				key={question.id}
				question={question}
			/>
		);
	});
	return (
		<div>
			{questions}
			<Card scroll>
				<Text mtbBig>
					<strong style={{ color: "black" }}>{content.link[props.lang]}: </strong>
					<NavLink to="/support">0x00f160522e53cb423c32bdc3b4d9555e416549b2bd512e7176</NavLink>
				</Text>
			</Card>
		</div>
	);
};

export default questionCards;
