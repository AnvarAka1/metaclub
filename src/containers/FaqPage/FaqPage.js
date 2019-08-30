import React, { Component } from "react";
import Paper from "../../components/UI/Paper/Paper";
import Grid from "../../components/Grid/Grid";
import Header from "../../components/UI/Header/Header";
import QuestionCards from "../../components/QuestionCards/QuestionCards";
class FaqPage extends Component {
  render() {
    return (
      <>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Header mtbBig h3 center thin>
            F.A.Q
          </Header>
          <Paper>
            <QuestionCards></QuestionCards>
          </Paper>
        </Grid>
      </>
    );
  }
}

export default FaqPage;
