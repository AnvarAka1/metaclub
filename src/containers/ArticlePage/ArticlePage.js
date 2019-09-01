import React, { Component } from "react";
import Photo from "../../assets/images/news/news.png";
import Grid from "../../components/Grid/Grid";
import Header from "../../components/UI/Header/Header";
import Text from "../../components/UI/Text/Text";
import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";

export class ArticlePage extends Component {
  state = {
    article: {
      id: 0,
      image: Photo,
      title: "Community - Blockchain.io Ambassador Program",
      date: "31 August 2019",
      views: 27,
      comments: 27,
      catId: 1
    }
  };
  render() {
    return <Grid container></Grid>;
  }
}

export default ArticlePage;
