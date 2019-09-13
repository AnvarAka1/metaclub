import React, { Component } from "react";
import classes from "./Layout.module.css";
import Drawer from "@material-ui/core/Drawer";
import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems";
import Footer from "../../components/Footer/Footer";
import Hidden from "@material-ui/core/Hidden";
import Modal from "../../components/Modal/Modal";
import SignForm from "../../components/SignForm/SignForm";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
// import Spinner from "../../components/Spinner/Spinner";

class Layout extends Component {
	placeholders = {
		signIn: {
			inEmail: [ "Email", "Email" ],
			inPassword: [ "Пароль", "" ],
			inRemember: [ "Запомнить меня", "Remember me" ]
		},
		signUp: {
			upName: [ "Имя", "Name" ],
			upEmail: [ "Email", "Email" ],
			upFpassword: [ "Пароль", "Password" ],
			upSpassword: [ "Подтвердите пароль", "Confirm password" ],
			upAccept: [ "Я принимаю условия пользовательского соглашения", "I accept terms of service" ],
			upSubscribe: [ "Подписаться на еженедельные рассылки", "Subscribe to weekly newsletters" ]
		}
	};
	state = {
		signIn: {
			inEmail: {
				inputType: "input",
				config: {
					type: "email",
					name: "email",
					placeholder: "Email"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				validation: {
					required: true,
					minChar: 6,
					maxChar: 20
				},
				isValid: false,
				errMessage: "",
				touched: false,
				value: ""
			},
			inPassword: {
				inputType: "input",
				config: {
					type: "password",
					name: "password",
					placeholder: "Password"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				validation: {
					required: true,
					minChar: 6,
					maxChar: 20
				},
				isValid: false,
				touched: false,
				value: ""
			},
			inRemember: {
				inputType: "checkbox",
				config: {
					name: "remember",
					placeholder: "",
					type: "checkbox",
					label: "Запомнить меня"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				isValid: true,
				value: ""
			}
		},
		signUp: {
			upName: {
				inputType: "input",
				config: {
					type: "text",
					name: "name",
					placeholder: "Name"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				validation: {
					required: true,
					minChar: 6,
					maxChar: 20
				},
				isValid: false,
				touched: false,
				value: ""
			},
			upEmail: {
				inputType: "input",
				config: {
					type: "email",
					name: "email",
					placeholder: "Email"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				validation: {
					required: true,
					minChar: 6,
					maxChar: 20
				},
				isValid: false,
				touched: false,
				value: ""
			},
			upFpassword: {
				inputType: "input",
				config: {
					type: "password",
					name: "fpassword",
					placeholder: "Password"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				validation: {
					required: true,
					minChar: 6,
					maxChar: 20
				},
				isValid: false,
				touched: false,
				value: ""
			},
			upSpassword: {
				inputType: "input",
				config: {
					type: "password",
					name: "spassword",
					placeholder: "Confirm password"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				validation: {
					required: true,
					minChar: 6,
					maxChar: 20
				},
				isValid: false,
				touched: false,
				value: ""
			},
			upAccept: {
				inputType: "checkbox",
				config: {
					name: "accept",
					placeholder: "",
					type: "checkbox",
					label: "Я принимаю условия пользовательского соглашения"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				isValid: true,
				value: ""
			},
			upSubscribe: {
				inputType: "checkbox",
				config: {
					name: "subscribe",
					placeholder: "",
					type: "checkbox",
					label: "Подписаться на еженедельные рассылки"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				isValid: true,
				value: ""
			}
		},
		isSignInValid: false,
		isSignUpValid: false,
		isSignIn: true,
		isModalOpened: false
	};
	componentDidUpdate() {
		if (this.props.isFormFlush) {
			let signIn = { ...this.state.signIn };
			let signUp = { ...this.state.signUp };
			// eslint-disable-next-line
			for (let key in signIn) {
				signIn[key].value = "";
			}
			// eslint-disable-next-line
			for (let key in signUp) {
				signUp[key].value = "";
			}

			this.setState({
				isSignIn: true,
				isModalOpened: false,
				isSignInValid: false,
				isSignUpValid: false,
				flushForms: false,
				signIn: signIn,
				signUp: signUp
			});
			this.props.onFormFlush();
		}
	}
	formSubmitHandler = event => {
		event.preventDefault();
		const { upName, upEmail, upFpassword } = this.state.signUp;
		const { inEmail, inPassword } = this.state.signIn;
		if (this.state.isSignIn) {
			this.props.onAuth(null, inEmail.value, inPassword.value, null, null, this.state.isSignIn);
		} else {
			this.props.onAuth(upName.value, upEmail.value, upFpassword.value, null, null, this.state.isSignIn);
		}
	};
	signInClickedHandler = event => {
		event.preventDefault();
		this.setState({ isSignIn: true, isModalOpened: true });
	};
	signUpClickedHandler = event => {
		event.preventDefault();
		this.setState({ isSignIn: false, isModalOpened: true });
	};
	backdropHandler = () => {
		this.setState({ isModalOpened: false });
	};
	inputChangedHandler = (event, inputIdentifier) => {
		let form = {};
		form = this.state.isSignIn ? { ...this.state.signIn } : { ...this.state.signUp };
		const { isValid, errMessage } = this.checkValidity(event.target.value, form[inputIdentifier].validation);
		form[inputIdentifier].value = event.target.value;
		form[inputIdentifier].touched = true;
		form[inputIdentifier].isValid = isValid;
		form[inputIdentifier].errMessage = errMessage;
		if (this.state.isSignIn) {
			const valid = this.checkFormValidity();
			this.setState({ signIn: form, isSignInValid: valid });
		} else {
			const valid = this.checkFormValidity();
			this.setState({ signUp: form, isSignUpValid: valid });
		}
	};
	checkFormValidity = () => {
		let validForm = true;
		if (this.state.isSignIn) {
			const form = { ...this.state.signIn };
			// eslint-disable-next-line
			for (let key in form) {
				validForm = form[key].isValid && validForm;
			}
		} else {
			const form = { ...this.state.signUp };
			// eslint-disable-next-line
			for (let key in form) {
				validForm = form[key].isValid && validForm;
			}
		}
		return validForm;
	};
	checkValidity = (value, rules) => {
		let isValid = true;
		let errMessage = "";
		if (!rules) {
			return { isValid: true, errMessage: "" };
		}
		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
			if (!isValid && errMessage.trim() === "") {
				errMessage = "This field must be filled";
			}
		}
		if (rules.minChar) {
			isValid = value.length >= rules.minChar && isValid;
			if (!isValid && errMessage.trim() === "") {
				errMessage = "Minimum characters must be more than " + rules.minChar;
			}
		}
		if (rules.maxChar) {
			isValid = value.length <= rules.maxChar && isValid;
			if (!isValid && errMessage.trim() === "") {
				errMessage = "Maximum characters must be less than " + rules.maxChar;
			}
		}
		if (rules.required) {
		}
		return { isValid: isValid, errMessage: errMessage };
	};
	formLang = () => {
		const { lang } = this.props;
		let signIn = { ...this.state.signIn };
		let newSignIn = [];
		// eslint-disable-next-line
		for (let key in signIn) {
			let fm = {
				...signIn[key],
				...signIn[key].config
			};
			fm.config.placeholder = this.placeholders.signIn[key][lang];
			newSignIn.push({
				key: key,
				elementConfig: fm
			});
		}
		let signUp = { ...this.state.signUp };
		let newSignUp = [];
		// eslint-disable-next-line
		for (let key in signUp) {
			let fm = {
				...signUp[key],
				...signUp[key].config
			};
			fm.config.placeholder = this.placeholders.signIn[key][lang];
			newSignUp.push({
				key: key,
				elementConfig: fm
			});
		}
	};
	render() {
		const modal = this.state.isModalOpened && (
			<Modal opened={this.state.isModalOpened} backdropClicked={this.backdropHandler}>
				<SignForm
					lang={this.props.lang}
					loading={this.props.isLoading}
					formSubmitted={this.formSubmitHandler}
					isSignInValid={this.state.isSignInValid}
					isSignUpValid={this.state.isSignUpValid}
					isSignIn={this.state.isSignIn}
					signIn={this.state.signIn}
					signUp={this.state.signUp}
					signInClicked={this.signInClickedHandler}
					signUpClicked={this.signUpClickedHandler}
					inputChanged={this.inputChangedHandler}
				/>
			</Modal>
		);
		return (
			<React.Fragment>
				{modal}
				<div className={[ classes.Layout ].join(" ")}>
					<NavigationItems
						logout={this.props.onLogout}
						isAuthorized={this.props.isAuthorized}
						navigationClicked={this.props.navigationClicked}
						lang={this.props.lang}
						langClicked={this.props.langClicked}
						drawerOpened={this.props.drawerOpened}
						signInClicked={this.signInClickedHandler}
						signUpClicked={this.signUpClickedHandler}
					/>
					<Hidden mdUp>
						<Drawer open={this.props.drawerLeft} onClose={this.props.drawerClosed} anchor="right">
							<NavigationItems
								navigationClicked={this.props.navigationClicked}
								lang={this.props.lang}
								vertical
								logout={this.props.onLogout}
								drawerClosed={this.props.drawerClosed}
								langClicked={this.props.langClicked}
								signInClicked={this.signInClickedHandler}
								signUpClicked={this.signUpClickedHandler}
								isAuthorized={this.props.isAuthorized}
							/>
						</Drawer>
					</Hidden>
					<div className={classes.Container}>{this.props.children}</div>
					<Footer
						lang={this.props.lang}
						footerForm={this.props.footerForm}
						inputChanged={this.props.inputChanged}
						submitted={this.props.formSubmitted}
					/>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthorized: state.auth.token !== null,
		isLoading: state.auth.loading,
		isFormFlush: state.auth.formFlush
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuth: (name, email, password, avatar, position, isSignup) =>
			dispatch(actions.auth(name, email, password, avatar, position, isSignup)),
		onLogout: () => dispatch(actions.logout()),
		onFormFlush: () => dispatch(actions.authFormFlush())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
