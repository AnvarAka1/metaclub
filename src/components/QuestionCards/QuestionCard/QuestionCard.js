import React from "react";
import Card from "../../UI/Card/Card";
// import classes from "./QuestionCard.module.css";
import Header from "../../UI/Header/Header";
import Text from "../../UI/Text/Text";
import ArrowUpIcon from "../../../assets/images/icons/arrowUp.png";
import ArrowDownIcon from "../../../assets/images/icons/arrowDown.png";
import classes from "./QuestionCard.module.css";
const questionCard = props => {
  return (
    <Card bb scroll>
      <Header h5 clicked={props.clicked} pointer>
        <span style={{ verticalAlign: "top" }} className="accent">
          Q:{" "}
        </span>
        <span style={{ width: "85%", display: "inline-block" }}>
          {props.question.title}
        </span>
        <span className={classes.Toggler}>
          <img
            src={props.opened ? ArrowUpIcon : ArrowDownIcon}
            alt="toggler"
          ></img>
        </span>
      </Header>
      <Text transition textClass={!props.opened ? "Hidden" : null} mt>
        {props.question.text}
      </Text>
    </Card>
  );
};

export default questionCard;
