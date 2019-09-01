import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Header from "../../components/UI/Header/Header";
import Grid from "../../components/Grid/Grid";
import Button from "../../components/UI/Button/Button";
import FirstImage from "../../assets/images/about/first.png";
import SecondImage from "../../assets/images/about/second.png";
import HorizontalImages from "../../components/HorizontalImages/HorizontalImages";
import Text from "../../components/UI/Text/Text";
import ServerCards from "../../components/ServerCards/ServerCards";
import NewsItems from "../../components/NewsItems/NewsItems";
import Photo from "../../assets/images/news/news.png";
class AboutPage extends Component {
  state = {
    news: [
      {
        id: 0,
        image: Photo,
        title: "Community - Blockchain.io Ambassador Program",
        date: "31 August 2019",
        views: 27,
        comments: 27,
        catId: 1
      },
      {
        id: 1,
        image: Photo,
        title: "Community",
        date: "30 August 2019",
        views: 26,
        comments: 28,
        catId: 2
      },
      {
        id: 2,
        image: Photo,
        title: "Blockchain.io",
        date: "29 August 2019",
        views: 25,
        comments: 29,
        catId: 1
      },
      {
        id: 3,
        image: Photo,
        title: "Ambassador",
        date: "28 August 2019",
        views: 24,
        comments: 30,
        catId: 1
      }
    ]
  };
  render() {
    return (
      <Grid con="true" container spacing={3}>
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
          <Header center normal h3 mtb>
            Server Statistics
          </Header>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <ServerCards></ServerCards>
        </Grid>
        <Grid item xs={12}>
          <Header center h3 normal mtb>
            News / Media
          </Header>
        </Grid>

        {/* Pass some state */}
        <NewsItems news={this.state.news}></NewsItems>
        <div style={{ textAlign: "center", width: "100%" }}>
          <NavLink to="/articles">
            <Button big grey buttonStyle={{ marginTop: "30px" }}>
              More news
            </Button>
          </NavLink>
        </div>
      </Grid>
    );
  }
}

export default AboutPage;
