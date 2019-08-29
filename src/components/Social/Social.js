import React from "react";
import Logo from "../Logo/Logo";
import classes from "./Social.module.css";
const social = props => {
  const socialLinks = [
    {
      title: "Telegram",
      icon: "tg",
      link: "/telegram"
    },
    {
      title: "Facebook",
      icon: "fb",
      link: "/facebook"
    },
    {
      title: "Youtube",
      icon: "youtube",
      link: "https://youtube.com"
    }
  ];
  const socials = socialLinks.map(socialLink => {
    return (
      <a href={socialLink.link} target="_blank" rel="noopener noreferrer">
        {socialLink.title}
      </a>
    );
  });
  return (
    <div className={classes.Social}>
      <Logo></Logo>
      {socials}
      <p>example@gmail.com</p>
    </div>
  );
};

export default social;
