import React from "react";
import QuestionCard from "./QuestionCard/QuestionCard";
import { NavLink } from "react-router-dom";
import Text from "../UI/Text/Text";
import Card from "../UI/Card/Card";
const questionCards = props => {
  const questionsArray = [
    {
      id: 0,
      question: {
        title: "How can I delegate?",
        text:
          "- Open MetaGate and enter app://ForgingMHC#!/delegation/server/0x00f160522e53cb423c32bdc3b4d9555e416549b2bd512e7176 OR app://ForgingMHC#!/delegation/server/0x00ab27d45c13f4862df95221288db31678265e64bcaf362d2e OR app://ForgingMHC#!/delegation/server/0x0000496c628660f91a19f04d41c497353d749fda793f86a844 into address bar and delegate, start earning with us!"
      }
    },
    {
      id: 1,
      question: {
        title:
          "Why and how 96.7% bonus reward is possible, how is it sustainable?",
        text: "- Goal is to offer best delegation profit for our supporters."
      }
    },
    {
      id: 2,
      question: {
        title: "Will reward be always 96.7%?",
        text:
          "- Yes, until new role is launched, Verification/Torrent/Core roles, after that we will re-evaluate bonus structure. But rest assured we will do our best to give you highest possible bonus. Thank you for your support!"
      }
    }
  ];
  const questions = questionsArray.map(question => {
    return (
      <QuestionCard
        key={question.id}
        question={question.question}
      ></QuestionCard>
    );
  });
  return (
    <div>
      {questions}
      <Card scroll>
        <Text mtbBig>
          <strong style={{ color: "black" }}>
            To support our efforts, feel free to donate:{" "}
          </strong>
          <NavLink to="/support">
            0x00f160522e53cb423c32bdc3b4d9555e416549b2bd512e7176
          </NavLink>
        </Text>
      </Card>
    </div>
  );
};

export default questionCards;
