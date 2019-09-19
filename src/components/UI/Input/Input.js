import React from "react";
import classes from "./Input.module.css";
import Text from "../Text/Text";
import Header from "../Header/Header";
const input = props => {
	const inputClasses = [
		classes.Input,
		props.serverInput ? classes.Server : null,
		props.elementConfig && (props.elementConfig.inputClass && classes[props.elementConfig.inputClass])
	];
	let errMessage;
	if (props.elementConfig) {
		if (!props.elementConfig.isValid && props.elementConfig.touched && props.elementConfig.validation) {
			inputClasses.push(classes.Invalid);
			errMessage = <Text small>{props.elementConfig.errMessage}</Text>;
		}
	}
	let input;
	if (props.elementConfig) {
		switch (props.elementConfig.inputType) {
			case "input":
				input = (
					<input
						ref={props.inputRef}
						className={inputClasses.join(" ")}
						onChange={props.changed}
						value={props.elementConfig.value}
						{...props.elementConfig.config}
					/>
				);
				break;
			case "textarea":
				inputClasses.push(classes.Textarea);
				input = (
					<textarea
						ref={props.inputRef}
						className={inputClasses.join(" ")}
						onChange={props.changed}
						{...props.elementConfig.config}
						value={props.elementConfig.value}
					/>
				);
				break;
			case "range":
				inputClasses.push(classes.Range);
				input = (
					<input
						ref={props.inputRef}
						className={inputClasses.join(" ")}
						{...props.elementConfig.config}
						onChange={props.changed}
						value={props.elementConfig.value}
					/>
				);
				break;
			case "checkbox":
				inputClasses.push(classes.Checkbox);
				input = (
					<label className={classes.Label}>
						<input
							ref={props.inputRef}
							className={inputClasses.join(" ")}
							onChange={props.changed}
							// checked={props.elementConfig.checked}
							value={props.elementConfig.value}
							{...props.elementConfig.config}
						/>
						{props.elementConfig.config.label}
					</label>
				);
				break;
			case "select":
				input = (
					<select
						ref={props.inputRef}
						className={inputClasses.join(" ")}
						value={props.elementConfig.value}
						onChange={props.changed}
					>
						{props.elementConfig.options.map(option => (
							<option key={option.value} value={option.value}>
								{props.lang !== null ? option.displayValue[props.lang] : option.displayValue}
							</option>
						))}
					</select>
				);
				break;
			case "file":
				input = (
					<React.Fragment>
						<Header mb h6>
							{props.elementConfig.message ? props.elementConfig.message : null}
						</Header>
						<input
							ref={props.inputRef}
							className={inputClasses.join(" ")}
							onChange={props.changed}
							value={props.elementConfig.value}
							{...props.elementConfig.config}
						/>
					</React.Fragment>
				);
				break;
			default:
				input = (
					<input
						ref={props.inputRef}
						className={inputClasses.join(" ")}
						onChange={props.changed}
						value={props.elementConfig.value}
						{...props.elementConfig.config}
					/>
				);
				break;
		}
	} else {
		input = "Input";
	}

	return (
		<React.Fragment>
			{input}
			{errMessage}
		</React.Fragment>
	);
};

export default input;
