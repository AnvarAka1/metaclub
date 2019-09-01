import React, { Component } from "react";
import Grid from "../../components/Grid/Grid";
import Menu from "../../components/Menu/Menu";
import Photo from "../../assets/images/news/news.png";
import NewsItems from "../../components/NewsItems/NewsItems";
export class ArticlesPage extends Component {
  state = {
    menu: [
      { id: 0, title: "Все", count: 48, active: true },
      { id: 1, title: "Образование", count: 23, active: false },
      { id: 2, title: "Экономика", count: 5, active: false },
      { id: 3, title: "Политика", count: 10, active: false },
      { id: 4, title: "Финансы", count: 10, active: false }
    ],
    articles: [
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
    ],
    filteredArticles: []
  };
  componentDidMount() {
    const filteredArticles = this.state.articles.slice();
    this.setState({ filteredArticles: filteredArticles });
  }
  categoryHandler = (event, id) => {
    let menu = this.state.menu.slice();
    const index = menu.findIndex(element => {
      return element.id === id;
    });
    for (let i = 0; i < menu.length; i++) {
      menu[i].active = false;
    }
    menu[index].active = true;
    let farticles = this.state.articles.slice();
    if (id !== 0) {
      farticles = farticles.filter(article => {
        return article.catId === id;
      });
    }
    this.setState({ menu: menu, filteredArticles: farticles });
  };
  render() {
    return (
      <Grid item xs={12} style={{ marginTop: "50px" }}>
        <Grid container spacing={5}>
          <Grid item sm={3} xs={12}>
            <Menu clicked={this.categoryHandler} menu={this.state.menu}></Menu>
          </Grid>
          <Grid item md={8} sm={9} xs={12}>
            <Grid container spacing={5}>
              <NewsItems wide news={this.state.filteredArticles}></NewsItems>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default ArticlesPage;
