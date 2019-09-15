import React from "react";
import classes from "./SignForm.module.css";
import Grid from "../Grid/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "../UI/Button/Button";
import Header from "../UI/Header/Header";
import Input from "../UI/Input/Input";
import Spinner from "../Spinner/Spinner";
const signForm = props => {
	const { isSignIn, signIn, signUp, lang } = props;
	const content = {
		login: [ "Войти", "Login" ],
		reg: [ "Зарегистрироваться", "Register" ],
		sinHeader: [ "Авторизация", "Sign in" ],
		supHeader: [ "Регистрация", "Sign up" ],
		signInBtn: [ "Войти", "Sign in" ],
		signUpBtn: [ "Зарегистрироваться", "Sign up" ]
	};
	let sign = [];
	sign = isSignIn ? signIn.slice() : signUp.slice();
	const avatar = isSignIn ? null : (
		<Grid item xs={12}>
			<Input
				elementConfig={{
					inputType: "file",
					isValid: true,
					config: {
						type: "file"
					}
				}}
				changed={props.imageChanged}
			/>
		</Grid>
	);
	let signForm = (
		<Grid item xs={12}>
			<Spinner />
		</Grid>
	);
	if (!props.loading) {
		signForm = sign.map(sign => {
			return (
				<Grid item key={sign.key} {...sign.elementConfig.grid}>
					<Input changed={event => props.inputChanged(event, sign.key)} elementConfig={sign.elementConfig} />
				</Grid>
			);
		});
	}
	const button = isSignIn ? (
		<Button flatten wide disabled={!props.isSignInValid}>
			{content.login[lang]}
		</Button>
	) : (
		<Button flatten wide disabled={!props.isSignUpValid}>
			{content.reg[lang]}
		</Button>
	);
	return (
		<div className={classes.SignForm}>
			<div className={classes.Buttons}>
				<Button wide buttonClass={isSignIn ? "Accent" : "Transparent"} clicked={props.signInClicked}>
					{content.signInBtn[lang]}
				</Button>
				<Button wide white buttonClass={!isSignIn ? "Accent" : "Transparent"} clicked={props.signUpClicked}>
					{content.signUpBtn[lang]}
				</Button>
			</div>
			<Header mbBig center h4>
				{isSignIn ? content.sinHeader[lang] : content.supHeader[lang]}
			</Header>
			<form onSubmit={props.formSubmitted}>
				<Grid container spacing={3}>
					{avatar}
					{signForm}

					<Hidden xsDown>
						<Grid item sm={5} />
					</Hidden>
					<Grid item xs={12} sm={7}>
						{button}
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default signForm;
