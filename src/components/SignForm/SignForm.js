import React from "react";
import classes from "./SignForm.module.css";
import Grid from "../Grid/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "../UI/Button/Button";
import Header from "../UI/Header/Header";
import Input from "../UI/Input/Input";
import Spinner from "../Spinner/Spinner";
import GoogleIcon from "../../assets/images/icons/google.png";
import { NavLink } from "react-router-dom";
const signForm = props => {
	const { isSignIn, signIn, signUp, lang } = props;
	const content = {
		login: [ "Войти", "Login" ],
		reg: [ "Зарегистрироваться", "Register" ],
		forgotPass: [ "Забыли пароль?", "Forgot password?" ],
		sinHeader: [ "Авторизация", "Sign in" ],
		supHeader: [ "Регистрация", "Sign up" ],
		signInBtn: [ "Войти", "Sign in" ],
		signUpBtn: [ "Зарегистрироваться", "Sign up" ],
		message: [ "Выберите себе аватарку", "Choose your avatar" ],
		alternativeHeader: [ "Либо войдите с помощью", "Or login with" ]
	};
	let sign = [];
	sign = isSignIn ? signIn.slice() : signUp.slice();

	// const avatar = isSignIn ? null : (
	// 	<Grid item xs={12}>
	// 		<Input
	// 			elementConfig={{
	// 				message: content.message[props.lang],

	// 				inputType: "file",
	// 				isValid: true,
	// 				config: {
	// 					type: "file"
	// 				}
	// 			}}
	// 			changed={props.imageChanged}
	// 		/>
	// 	</Grid>
	// );
	let signForm = (
		<Grid item xs={12}>
			<Spinner />
		</Grid>
	);
	const socialLinks = (
		<React.Fragment>
			<Button flex white wide clicked={props.googleClicked} flatten>
				<img src={GoogleIcon} className={classes.Google} alt="Google" />Google
			</Button>
		</React.Fragment>
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
	const forgotPass = isSignIn ? (
		<Grid item sm={6} xs={12}>
			<NavLink to="forgot">
				<Header size={12} h6 color="#7146CE" clicked={props.modalClosed} headerStyle={{ textAlign: "right" }}>
					{content.forgotPass[props.lang]}
				</Header>
			</NavLink>
		</Grid>
	) : null;
	const button = isSignIn ? (
		<Button flatten wide disabled={!props.isSignInValid}>
			{content.login[lang]}
		</Button>
	) : (
		<Button flatten wide disabled={!props.isSignUpValid}>
			{content.reg[lang]}
		</Button>
	);
	const errorMessage = props.errorMessage ? (
		<Grid item xs={12}>
			<Header h6 color="red">
				{props.errorMessage}
			</Header>
		</Grid>
	) : null;
	let imageError = props.imageError ? (
		<Grid item xs={12}>
			<Header color="red" h6>
				{props.imageError}
			</Header>
		</Grid>
	) : null;
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
					{errorMessage}
					{/* {avatar} */}
					{imageError}
					{signForm}
					{forgotPass}
					<Hidden xsDown>
						<Grid item sm={5} />
					</Hidden>

					<Grid item xs={12} sm={7}>
						{button}
					</Grid>
				</Grid>
			</form>
			{isSignIn ? (
				<Grid container spacing={5}>
					<Grid item xs={12}>
						<Header mtb h6 center color="#333">
							{content.alternativeHeader[props.lang]}
						</Header>
						{socialLinks}
					</Grid>
				</Grid>
			) : null}
		</div>
	);
};

export default signForm;
