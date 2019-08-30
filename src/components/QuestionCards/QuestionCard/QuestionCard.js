import React from "react";
import Card from "../../UI/Card/Card";
// import classes from "./QuestionCard.module.css";
import Header from "../../UI/Header/Header";
import Text from "../../UI/Text/Text";

const questionCard = props => {
  return (
    <Card bb scroll>
      <Header h5>
        <span className="accent">Q: </span>
        {props.question.title}
      </Header>
      <Text mt>{props.question.text}</Text>
    </Card>
  );
};

export default questionCard;
