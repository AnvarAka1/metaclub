import React from "react";
import classes from "./Range.module.css";

import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./Range.css";
const range = props => {
	const left = `calc(${props.elementConfig.value / 10000}% - 40px)`;
	const roundUp = (num, precision) => {
		precision = Math.pow(10, precision);
		return Math.ceil(num * precision) / precision;
	};
	return (
		<div className={classes.RangeWrapper}>
			<div className={classes.Range}>
				<div
					style={{
						background: "#7146CE",
						left: `${left}`,
						color: "#fff"
					}}
					className={[ classes.Box, classes.Left ].join(" ")}
				>
					{props.elementConfig.value} MHC = {roundUp(props.mhc * props.elementConfig.value, 2)} USD
				</div>
				{/* <div style={{ background: "#D6D6D6" }} className={[ classes.Box, classes.Right ].join(" ")}>
					{props.maxValue} USD = {props.mhc * props.maxValue} MHC
				</div> */}
				{/* <Input
          elementConfig={props.elementConfig}
          changed={props.rangeChanged}
        ></Input> */}
				<Slider
					min={512}
					max={1000000}
					step={0.5}
					tooltip={false}
					value={props.elementConfig.value}
					onChange={props.rangeChanged}
				/>
			</div>
		</div>
	);
};

export default range;
