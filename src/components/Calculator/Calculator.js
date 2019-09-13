import React from "react";
import CalculatorInput from "./CalculatorInput/CalculatorInput";
import CalculatorCard from "./CalculatorCard/CalculatorCard";
import Grid from "../Grid/Grid";
const calculator = props => {
	const calculatorCard = props.calc.calcCard.map(calc => {
		return (
			<Grid item xs={12} sm={6} md={3} key={calc.id}>
				<CalculatorCard
					lang={props.lang}
					currency={calc.currency}
					percentage={calc.percentage}
					date={calc.date}
				/>
			</Grid>
		);
	});
	return (
		<Grid container spacing={5}>
			<Grid item xs={12}>
				<CalculatorInput
					lang={props.lang}
					calc={props.calc}
					rangeChanged={props.rangeChanged}
					inputChanged={props.inputChanged}
					buttonClicked={props.buttonClicked}
				/>
			</Grid>

			{calculatorCard}
		</Grid>
	);
};

export default calculator;
