import React from "react";
import classes from "./SignForm.module.css";
import Grid from "../Grid/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "../UI/Button/Button";
import Header from "../UI/Header/Header";
import Input from "../UI/Input/Input";
import Spinner from "../Spinner/Spinner";
// import GoogleIcon from "../../assets/images/icons/google.png";
import { NavLink } from "react-router-dom";
import GoogleLogin from "react-google-login";
const signForm = props => {
	const { isSignIn, signIn, signUp, lang } = props;
	const content = {
		login: [ "Войти", "Login" ],
		or: [ "Или", "Or" ],
		google: [ "Продолжить с Google", "Continue with Google" ],
		reg: [ "Зарегистрироваться", "Register" ],
		forgotPass: [ "Забыли пароль?", "Forgot password?" ],
		sinHeader: [ "Авторизация", "Sign in" ],
		supHeader: [ "Регистрация", "Sign up" ],
		signInBtn: [ "Войти", "Sign in" ],
		signUpBtn: [ "Зарегистрироваться", "Sign up" ],
		message: [ "Выберите себе аватарку", "Choose your avatar" ],
		alternativeHeader: [ "Либо войдите с помощью", "Or login with" ],
		agreement: [ "Условия пользовательского соглашения", "Terms of use agreement" ],
		agreementSignIn: [ "Продолжая, вы соглашаетесь с", "By continuing, you agree with" ],
		agreementLink: [ "Условиями использования Metaclub", "Terms of Metaclub usage" ]
	};
	let sign = [];
	sign = isSignIn ? signIn.slice() : signUp.slice();

	let signForm = (
		<Grid item xs={12}>
			<Spinner />
		</Grid>
	);

	const socialLinks = (
		<React.Fragment>
			<GoogleLogin
				buttonText={content.google[props.lang]}
				className={classes.GoogleButton}
				clientId="577775945538-b8slg5r441le79hi2606hm6gqh8a4sis.apps.googleusercontent.com"
				onSuccess={props.responseGoogle}
				onFailure={props.responseGoogle}
				cookiePolicy={"single_host_origin"}
			/>
		</React.Fragment>
	);
	const beforeCheckboxes = sign.length - 3;
	const agreement = !isSignIn && (
		<Grid item xs={12}>
			<a href="/agreement" rel="noopener noreferrer" target="_blank">
				<Header mt color="#7146ce" h6>
					{content.agreement[props.lang]}
				</Header>
			</a>
		</Grid>
	);
	if (!props.loading) {
		signForm = sign.map((sign, index) => {
			return (
				<Grid item key={sign.key} {...sign.elementConfig.grid}>
					<Input changed={event => props.inputChanged(event, sign.key)} elementConfig={sign.elementConfig} />
					{index === beforeCheckboxes && agreement}
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
					{isSignIn ? null : (
						<Hidden xsDown>
							<Grid item sm={5} />
						</Hidden>
					)}

					<Grid item xs={12} sm={7}>
						{button}
					</Grid>
					{isSignIn ? (
						<Grid item xs={12} sm={5}>
							<Header h5 center color="grey">
								{content.or[props.lang]}
							</Header>
						</Grid>
					) : null}
				</Grid>
			</form>
			{isSignIn ? (
				<Grid container spacing={3}>
					<Grid item xs={12}>
						{socialLinks}
					</Grid>
					<Grid item xs={12}>
						<Header h6 center normal>
							{content.agreementSignIn[props.lang]}
						</Header>
						<a href="/agreement" rel="noopener noreferrer" target="_blank">
							<Header center color="#7146ce" h6>
								{content.agreementLink[props.lang]}
							</Header>
						</a>
					</Grid>
				</Grid>
			) : null}
		</div>
	);
};

export default signForm;
