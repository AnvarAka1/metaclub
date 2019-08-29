import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Header from "../../components/UI/Header/Header";
import Grid from "../../components/Grid/Grid";
import Button from "../../components/UI/Button/Button";
import FirstImage from "../../assets/images/about/first.png";
import SecondImage from "../../assets/images/about/second.png";
import HorizontalImages from "../../components/HorizontalImages/HorizontalImages";
import Text from "../../components/UI/Text/Text";
import NewsItems from "../../components/NewsItems/NewsItems";
class AboutPage extends Component {
  render() {
    return (
      <>
        <Grid item sm={7}>
          <Header h1>
            Blockchain <span className="accent">4.0</span>
          </Header>
          <Header h2 thin mtb>
            <span className="accent">#MetaHash(MHC)</span> - Революционер на
            криптовалютной отрасли!{" "}
          </Header>
          <Text mbBig part>
            MetaClub - Это клуб для сообществу #MetaHash(MHC), Объединяющий
            Инвесторов, Программистов, Разработчиков и просто людей интересующей
            криптовалютный тематики.{" "}
          </Text>
          <Button white round>
            Подробнее >
          </Button>
        </Grid>
        <Grid item sm={5}>
          <img src={FirstImage} alt="Blockchain"></img>
        </Grid>
        <Grid item sm={12}>
          <HorizontalImages></HorizontalImages>
        </Grid>
        <Grid item sm={1}></Grid>
        <Grid item sm={5}>
          <img src={SecondImage} alt="Metahash"></img>
        </Grid>
        <Grid item sm={5}>
          <Header h4 hasLine mb>
            Что такое <span className="accent">#MetaHash?</span>
          </Header>
          <Text mtb>
            <span>#MetaHash</span> - это самый быстрый, надожный и
            децентрализованная криптавалюта в мире. Инвестирую и поддерживая
            децентрализованная сеть #MetaHash(MHC) вы можете зарабатывать на
            делигирования и форженге свои монеты.
          </Text>
          <Header h5>
            <NavLink to="/">
              <span className="accent">Подробнее »</span>
            </NavLink>
          </Header>
        </Grid>
        <Grid item xs={12}>
          <Header center h3 normal mtb>
            News / Media
          </Header>
        </Grid>

        {/* Pass some state */}
        <NewsItems xs={12} sm={4}></NewsItems>
        <div style={{ textAlign: "center", width: "100%" }}>
          <Button big grey buttonStyle={{ marginTop: "30px" }}>
            More news
          </Button>
        </div>
      </>
    );
  }
}

export default AboutPage;
