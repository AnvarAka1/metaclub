import React from "react";
// import classes from "./NewsItems.module.css";
import NewsItem from "./NewsItem/NewsItem";
import Grid from "../Grid/Grid";

const newsItems = props => {
  return (
    <>
      <Grid item xs={props.xs} sm={props.sm}>
        <NewsItem></NewsItem>
      </Grid>
      <Grid item xs={props.xs} sm={props.sm}>
        <NewsItem></NewsItem>
      </Grid>
      <Grid item xs={props.xs} sm={props.sm}>
        <NewsItem></NewsItem>
      </Grid>
    </>
  );
};

export default newsItems;
