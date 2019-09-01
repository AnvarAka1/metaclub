import React from "react";
import classes from "./HorizontalImages.module.css";
import firstImage from "../../assets/images/about/horizontal/first.png";
import secondImage from "../../assets/images/about/horizontal/second.png";
import thirdImage from "../../assets/images/about/horizontal/third.png";
import fourthImage from "../../assets/images/about/horizontal/fourth.png";
import fifthImage from "../../assets/images/about/horizontal/fifth.png";

const horizontalImages = props => {
  return (
    <div className={classes.HorizontalImages}>
      <a
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={firstImage} alt="Bitmax"></img>
      </a>
      <a
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={secondImage} alt="CoinMarketCap"></img>
      </a>
      <a
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={thirdImage} alt="CexIO"></img>
      </a>
      <a
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={fourthImage} alt="CoinGeko"></img>
      </a>
      <a
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={fifthImage} alt="KuCoin"></img>
      </a>
    </div>
  );
};

export default horizontalImages;
