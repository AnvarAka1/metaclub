import React from "react";
import classes from "./ProfileCard.module.css";
import Header from "../../UI/Header/Header";
import Text from "../../UI/Text/Text";
import Button from "../../UI/Button/Button";
function profileCard(props) {
  const lang = {
    articles: ["Статьи", "Articles"],
    button: ["Посмотреть профиль", "View profile"]
  };
  const button = props.viewProfile ? (
    <Button
      round
      accent
      clicked={event => props.clicked(event, props.profile.id)}
    >
      {lang.button[0]}
    </Button>
  ) : null;
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
        <div style={{ textAlign: "center", marginTop: "15px" }}>{button}</div>
      </div>
    </div>
  );
}

export default profileCard;
