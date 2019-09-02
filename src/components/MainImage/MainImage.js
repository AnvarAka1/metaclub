import React from "react";
import classes from "./MainImage.module.css";
function mainImage(props) {
  const mainImageClasses = [classes.MainImage];
  return (
    <div className={mainImageClasses.join(" ")}>
      <img src={props.src} alt={props.alt}></img>
    </div>
  );
}

export default mainImage;
