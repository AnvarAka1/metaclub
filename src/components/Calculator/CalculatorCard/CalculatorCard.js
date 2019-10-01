import React from "react";
import classes from "./CalculatorCard.module.css";
import Header from "../../UI/Header/Header";
import Text from "../../UI/Text/Text";
import Card from "../../UI/Card/Card";
const calculatorCard = props => {
	let currency = null;
	if (props.currency)
		currency = props.currency.map(cur => {
			return (
				<tr key={cur.key}>
					<td>
						<Text small thick color="#7146CE">
							{cur.key}
						</Text>
					</td>
					<td>
						<Text small thick color="#7146CE">
							{cur.value}
						</Text>
					</td>
				</tr>
			);
		});
	return (
		<div className={classes.CalculatorCard}>
			<Card calc>
				<table className={classes.Table}>
					<thead>
						<tr>
							<th colSpan="2">
								<Header h5>{props.date[props.lang]}</Header>
							</th>
						</tr>
					</thead>
					<tbody>{currency}</tbody>
				</table>
				<div className={classes.Roi}>
					<Text small>ROI</Text>
					<Header h4>{props.percentage}</Header>
				</div>
			</Card>
		</div>
	);
};

export default calculatorCard;
