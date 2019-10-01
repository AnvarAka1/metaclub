import React from "react";
import classes from "./CalculatorInput.module.css";
import Header from "../../UI/Header/Header";
import Input from "../../UI/Input/Input";
import Range from "../../Range/Range";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
const calculatorInput = props => {
	const content = {
		header: [ "Калькулятор доходности", "Profitability calculator" ],
		subheader: [
			"Зарабатывайте 90% дохода от своих делигированных Монетах.",
			"Earn 90% of the income from your delegated Coins."
		],
		countText: [ "Или напишите количество", "Or write the quantity" ],
		button: [ "Готово", "Done" ],
		bottomText: [ "Средняя доходность в день", "Average daily profitability" ]
	};

	return (
		<div className={classes.CalculatorInput}>
			<Card calc>
				<Header normal h3>
					{content.header[props.lang]}:
				</Header>
				<Header h5>{content.subheader[props.lang]}</Header>
				<Range
					mhc={props.mhc}
					minValue={512}
					maxValue={1000000}
					elementConfig={props.calc.range}
					rangeChanged={props.rangeChanged}
				/>
				<div className={classes.Count}>
					<Header h5 color="#7146CE">
						{content.countText[props.lang]}
					</Header>
					<Input elementConfig={props.calc.input} changed={props.inputChanged} />
					<Button clicked={props.buttonClicked}>{content.button[props.lang]}</Button>
				</div>
				{/* <Header color="#777" h5>
					{content.bottomText[props.lang]} <span className="accent">#MHC</span>
				</Header> */}
			</Card>
		</div>
	);
};

export default calculatorInput;
