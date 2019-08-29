import React from "react";
import Logo from "../Logo/Logo";
import classes from "./Social.module.css";
import TgIcon from "../../assets/images/icons/telegram.png";
import FbIcon from "../../assets/images/icons/facebook.png";
import YtIcon from "../../assets/images/icons/youtube.png";
import MsgIcon from "../../assets/images/icons/message.png";
const social = props => {
  const socialLinks = [
    {
      title: "Telegram",
      icon: TgIcon,
      link: "/telegram"
    },
    {
      title: "Facebook",
      icon: FbIcon,
      link: "/facebook"
    },
    {
      title: "Youtube",
      icon: YtIcon,
      link: "https://youtube.com"
    }
  ];
  const socials = socialLinks.map(socialLink => {
    return (
      <a
        key={socialLink.title}
        href={socialLink.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={socialLink.icon} alt={socialLink.title}></img>
      </a>
    );
  });
  return (
    <div className={classes.Social}>
      <Logo></Logo>
      <div className={classes.Links}>{socials}</div>
      <p className={classes.Message}>
        <img src={MsgIcon} alt="message"></img>
        <span>example@gmail.com</span>
      </p>
    </div>
  );
};

export default social;
