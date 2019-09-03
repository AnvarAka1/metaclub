import React from "react";
import classes from "./CalculatorInput.module.css";
import Header from "../../UI/Header/Header";
import Input from "../../UI/Input/Input";
import Range from "../../Range/Range";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
const calculatorInput = props => {
  const lang = {
    header: ["Калькулятор доходности", "Profitability calculator"],
    subheader: [
      "Зарабатывайте 90% дохода от своих делигированных Монетах.",
      "Earn 90% of the income from your delegated Coins."
    ],
    countText: ["Или напишите количество", "Or write the quantity"],
    button: ["Готово", "Done"],
    bottomText: ["Средняя доходность в день", "Average daily profitability"]
  };

  return (
    <div className={classes.CalculatorInput}>
      <Card calc>
        <Header normal h3>
          {lang.header[0]}:
        </Header>
        <Header h5>{lang.subheader[0]}</Header>
        <Range
          maxValue={props.maxValue}
          elementConfig={props.calc.range}
          rangeChanged={props.rangeChanged}
        ></Range>
        <div className={classes.Count}>
          <Header h5 color="#7146CE">
            {lang.countText[0]}
          </Header>
          <Input
            elementConfig={props.calc.input}
            changed={props.inputChanged}
          ></Input>
          <Button clicked={props.buttonClicked}>{lang.button[0]}</Button>
        </div>
        <Header color="#777" h5>
          {lang.bottomText[0]} <span className="accent">{props.mhc} #MHC</span>
        </Header>
      </Card>
    </div>
  );
};

export default calculatorInput;
