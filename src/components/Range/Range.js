import React from "react";
import classes from "./Range.module.css";
import Input from "../UI/Input/Input";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./Range.css";
const range = props => {
  const left = `calc(${props.elementConfig.value}% - 40px)`;
  return (
    <div className={classes.RangeWrapper}>
      <div className={classes.Range}>
        <div
          style={{
            background: "#7146CE",
            left: `${left}`,
            color: "#fff"
          }}
          className={[classes.Box, classes.Left].join(" ")}
        >
          1 022 = 502 USD
        </div>
        <div
          style={{ background: "#D6D6D6" }}
          className={[classes.Box, classes.Right].join(" ")}
        >
          1 002 128
        </div>
        {/* <Input
          elementConfig={props.elementConfig}
          changed={props.rangeChanged}
        ></Input> */}
        <Slider
          min={0}
          max={100}
          tooltip={false}
          value={props.elementConfig.value}
          onChange={props.rangeChanged}
        ></Slider>
      </div>
    </div>
  );
};

export default range;
