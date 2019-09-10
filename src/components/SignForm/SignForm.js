import React from "react";
import classes from "./SignForm.module.css";
import Grid from "../Grid/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "../UI/Button/Button";
import Header from "../UI/Header/Header";
import Input from "../UI/Input/Input";

const signForm = props => {
	const { isSignIn, signIn, signUp } = props;
	const signFormArray = [];
	let sign = {};
	sign = isSignIn ? { ...signIn } : { ...signUp };
	// eslint-disable-next-line
	for (let key in sign) {
		signFormArray.push({ key: key, elementConfig: sign[key] });
	}
	const signForm = signFormArray.map(sign => {
		return (
			<Grid item key={sign.key} {...sign.elementConfig.grid}>
				<Input changed={event => props.inputChanged(event, sign.key)} elementConfig={sign.elementConfig} />
			</Grid>
		);
	});
	const button = isSignIn ? (
		<Button flatten wide disabled={!props.isSignInValid}>
			Login Now
		</Button>
	) : (
		<Button flatten wide disabled={!props.isSignUpValid}>
			Register Now
		</Button>
	);
	return (
		<div className={classes.SignForm}>
			<div className={classes.Buttons}>
				<Button wide buttonClass={isSignIn ? "Accent" : "Transparent"} clicked={props.signInClicked}>
					Sign in
				</Button>
				<Button wide white buttonClass={!isSignIn ? "Accent" : "Transparent"} clicked={props.signUpClicked}>
					Sign up
				</Button>
			</div>
			<Header mbBig center h4>
				{isSignIn ? "Sign in" : "Sign up"}
			</Header>
			<form onSubmit={props.formSubmitted}>
				<Grid container spacing={3}>
					{signForm}
					<Hidden xsDown>
						<Grid item sm={6} />
					</Hidden>
					<Grid item xs={12} sm={6}>
						{button}
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default signForm;
