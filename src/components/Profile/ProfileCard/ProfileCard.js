import React from "react";
import classes from "./ProfileCard.module.css";
import Header from "../../UI/Header/Header";
import Text from "../../UI/Text/Text";
function profileCard(props) {
  const lang = {
    articles: ["Статьи", "Articles"]
  };

  return (
    <div className={classes.ProfileCard}>
      <div className={classes.Profile}>
        <div className={classes.ImageWrapper}>
          <img src={props.profile.photo} alt={props.profile.name}></img>
        </div>
        <Header h4>{props.profile.name}</Header>
        <Text>{props.profile.position[props.lang]}</Text>
      </div>
      <div>
        <p className={classes.Articles}>{lang.articles[props.lang]}:</p>
        <Header h3 center>
          {props.profile.artCount}
        </Header>
      </div>
    </div>
  );
}

export default profileCard;
