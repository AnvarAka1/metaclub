import React from "react";
import classes from "./ServerSubCard.module.css";
import Text from "../../UI/Text/Text";
import CpIcon from "../../../assets/images/icons/copy.png";

const serverSubCard = props => {
	let textInput = React.createRef();
	function handleClick() {
		textInput.current.select();
		document.execCommand("copy");
		props.copied();
	}
	return (
		<div className={classes.ServerSubCard}>
			<div className={classes.Background} />
			<div className={classes.Foreground}>
				<div className={classes.Box}>
					<Text>{props.text}</Text>
					<input ref={textInput} type="text" defaultValue={props.text} name="hidden" />
					<img src={CpIcon} alt="Copy" onClick={handleClick} />
				</div>
			</div>
		</div>
	);
};

export default serverSubCard;
