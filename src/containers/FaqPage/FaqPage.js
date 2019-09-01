import React, { Component } from "react";
import Paper from "../../components/UI/Paper/Paper";
import Grid from "../../components/Grid/Grid";
import Header from "../../components/UI/Header/Header";
import QuestionCards from "../../components/QuestionCards/QuestionCards";
class FaqPage extends Component {
  state = {
    questionsArray: [
      {
        id: 0,
        opened: false,
        question: {
          title: "How can I delegate?",
          text:
            "- Open MetaGate and enter app://ForgingMHC#!/delegation/server/0x00f160522e53cb423c32bdc3b4d9555e416549b2bd512e7176 OR app://ForgingMHC#!/delegation/server/0x00ab27d45c13f4862df95221288db31678265e64bcaf362d2e OR app://ForgingMHC#!/delegation/server/0x0000496c628660f91a19f04d41c497353d749fda793f86a844 into address bar and delegate, start earning with us!"
        }
      },
      {
        id: 1,
        opened: false,
        question: {
          title:
            "Why and how 96.7% bonus reward is possible, how is it sustainable?",
          text: "- Goal is to offer best delegation profit for our supporters."
        }
      },
      {
        id: 2,
        opened: false,
        question: {
          title: "Will reward be always 96.7%?",
          text:
            "- Yes, until new role is launched, Verification/Torrent/Core roles, after that we will re-evaluate bonus structure. But rest assured we will do our best to give you highest possible bonus. Thank you for your support!"
        }
      }
    ]
  };

  toggleHandler = (event, id) => {
    let questionsArray = this.state.questionsArray.slice();
    const index = questionsArray.findIndex(question => {
      return question.id === id;
    });
    console.log("index = ", index);
    questionsArray[index].opened = !questionsArray[index].opened;
    this.setState({ questionsArray: questionsArray });
  };
  render() {
    return (
      <>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Header mtbBig h3 center thin>
            F.A.Q
          </Header>
          <Paper>
            <QuestionCards
              toggleClicked={this.toggleHandler}
              questionsArray={this.state.questionsArray}
            ></QuestionCards>
          </Paper>
        </Grid>
      </>
    );
  }
}

export default FaqPage;
