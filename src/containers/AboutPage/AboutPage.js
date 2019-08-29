import React, { Component } from "react";
import Header from "../../components/UI/Header/Header";
import Grid from "../../components/Grid/Grid";
import Button from "../../components/UI/Button/Button";

class AboutPage extends Component {
  render() {
    return (
      <>
        <Grid item sm={7}>
          <Header h1>
            Blockchain <span className="accent">4.0</span>
          </Header>
          <Header h2 thin>
            <span className="accent">#MetaHash(MHC)</span> - Революционер на
            криптовалютной отрасли!{" "}
          </Header>
          <p>
            MetaClub - Это клуб для сообществу #MetaHash(MHC), Объединяющий
            Инвесторов, Программистов, Разработчиков и просто людей интересующей
            криптовалютный тематики.{" "}
          </p>
          <Button white round>
            Подробнее >
          </Button>
        </Grid>
        <Grid item sm={5}>
          <img src={"test"}></img>
        </Grid>
      </>
    );
  }
}

export default AboutPage;
