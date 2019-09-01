import React from "react";
// import classes from "./NewsItems.module.css";
import NewsItem from "./NewsItem/NewsItem";
import Grid from "../Grid/Grid";

const newsItems = props => {
  const news = props.news.map(newsItem => {
    return (
      <Grid key={newsItem.id} item xs={12} sm={props.wide ? 12 : 4}>
        <NewsItem key={newsItem.id} {...newsItem}></NewsItem>
      </Grid>
    );
  });
  return <>{news}</>;
};

export default newsItems;
