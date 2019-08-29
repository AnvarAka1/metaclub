import React from "react";
import classes from "./NewsItem.module.css";
import { NavLink } from "react-router-dom";
import Image from "../../../assets/images/news/news.png";
import Header from "../../UI/Header/Header";
const newsItem = props => {
  return (
    <div className={classes.NewsItem}>
      <NavLink to="/news">
        <div className={classes.Image}>
          <img src={Image} alt="news"></img>
        </div>
        <div className={classes.Text}>
          <p className={classes.Date}>31 August 2019</p>
          <Header
            h4
            thin
            headerStyle={{ color: "#333333", lineHeight: "28px" }}
            mtb
          >
            " Community - Blockchain.io Ambassador Program "
          </Header>
          <span className={[classes.Link, "accent"].join(" ")}>
            Read more »
          </span>
        </div>
      </NavLink>
    </div>
  );
};

export default newsItem;
