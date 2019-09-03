import React from "react";
import CalculatorInput from "./CalculatorInput/CalculatorInput";
import CalculatorCard from "./CalculatorCard/CalculatorCard";
import Grid from "../Grid/Grid";
const calculator = props => {
  const calculatorCard = props.calc.calcCard.map(calc => {
    return (
      <Grid item xs={12} sm={6} md={3} key={calc.id}>
        <CalculatorCard
          currency={calc.currency}
          percentage={calc.percentage}
          date={calc.date}
        ></CalculatorCard>
      </Grid>
    );
  });
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <CalculatorInput
          calc={props.calc}
          rangeChanged={props.rangeChanged}
          inputChanged={props.inputChanged}
          buttonClicked={props.buttonClicked}
        ></CalculatorInput>
      </Grid>

      {calculatorCard}
    </Grid>
  );
};

export default calculator;
