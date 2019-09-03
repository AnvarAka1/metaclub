import React from "react";
import classes from "./ServerSubCard.module.css";
import Text from "../../UI/Text/Text";
import CpIcon from "../../../assets/images/icons/copy.png";
const serverSubCard = props => {
  return (
    <div className={classes.ServerSubCard}>
      <div className={classes.Background}></div>
      <div className={classes.Foreground}>
        <div className={classes.Box}>
          <Text>{props.text}</Text>
          <img src={CpIcon} alt="Copy" onClick={props.clicked}></img>
        </div>
      </div>
    </div>
  );
};

export default serverSubCard;
