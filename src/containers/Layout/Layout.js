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
// import axios from "../../axios-db";
// import Spinner from "../../components/Spinner/Spinner";

class Layout extends Component {
	placeholders = {
		signIn: {
			inEmail: [ "Email", "Email" ],
			inPassword: [ "Пароль", "Password" ],
			inRemember: [ "Запомнить меня", "Remember me" ]
		},
		signUp: {
			upName: [ "Имя", "Name" ],
			upEmail: [ "Email", "Email" ],
			upPosition: [ "Должность", "Position" ],
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
					minChar: 6
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
					placeholder: "Password",
					autoComplete: "current-password"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				validation: {
					required: true,
					minChar: 8,
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
					sm: 6
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
					minChar: 3,
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
					minChar: 6
				},
				isValid: false,
				touched: false,
				value: ""
			},
			// upPosition: {
			// 	inputType: "input",
			// 	config: {
			// 		type: "text",
			// 		name: "position",
			// 		placeholder: "Position"
			// 	},
			// 	grid: {
			// 		xs: 12,
			// 		sm: 12
			// 	},
			// 	isValid: true,
			// 	touched: false,
			// 	value: ""
			// },
			upFpassword: {
				inputType: "input",
				config: {
					type: "password",
					name: "fpassword",
					placeholder: "Password",
					autoComplete: "new-password"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				validation: {
					required: true,
					minChar: 8,
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
					placeholder: "Confirm password",
					autoComplete: "new-password"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				validation: {
					required: true,
					minChar: 8,
					maxChar: 20,
					target: "upFpassword"
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
				validation: {
					required: true
				},
				isValid: false,
				checked: false,
				value: 1
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
		drawerLeft: false,
		isSignInValid: false,
		isSignUpValid: false,
		isSignIn: true,
		isModalOpened: false,
		selectedFile: null,
		imageError: null
	};
	componentDidUpdate() {
		// axios.get(`/users/${id}`).then(res => {
		// 	this.setState({ profile: res.data });
		// });
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
		// const { upName, upEmail, upFpassword, upPosition } = this.state.signUp;
		const { inEmail, inPassword } = this.state.signIn;
		// const position = upPosition.value && upPosition.value;
		if (this.state.isSignIn) {
			this.props.onAuth(null, inEmail.value, inPassword.value, null, null, this.state.isSignIn);
		} else {
			this.props.onAuth(
				upName.value,
				upEmail.value,
				upFpassword.value,
				this.state.selectedFile,
				null,
				this.state.isSignIn
			);
		}
	};
	openDrawerHandler = () => {
		this.setState({ drawerLeft: true });
	};
	closeDrawerHandler = () => {
		this.setState({ drawerLeft: false });
	};
	signInClickedHandler = event => {
		event.preventDefault();
		this.setState({ isSignIn: true, isModalOpened: true });
		this.closeDrawerHandler();
	};
	signUpClickedHandler = event => {
		event.preventDefault();
		this.setState({ isSignIn: false, isModalOpened: true });
		this.closeDrawerHandler();
	};
	backdropHandler = () => {
		this.setState({ isModalOpened: false });
	};
	inputChangedHandler = (event, inputIdentifier) => {
		let form = {};
		form = this.state.isSignIn ? { ...this.state.signIn } : { ...this.state.signUp };

		const { isValid, errMessage } =
			form[inputIdentifier].inputType === "checkbox"
				? this.checkCheckboxValidity(event.target.checked, form[inputIdentifier].validation)
				: this.checkValidity(event.target.value, form[inputIdentifier].validation);

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
	checkCheckboxValidity = (value, rules) => {
		if (!rules) {
			return { isValid: true, errMessage: "" };
		}
		return { isValid: value, errMessage: "" };
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

		if (rules.target) {
			let fPass;
			// eslint-disable-next-line
			for (let key in this.state.signUp) {
				if (key === rules.target) {
					fPass = this.state.signUp[key];
					break;
				}
			}
			isValid = fPass.value === value && isValid;
			if (!isValid && errMessage.trim() === "") {
				errMessage = "Passwords must be the same";
			}
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
			if (fm.inputType === "checkbox") {
				fm.config.label = this.placeholders.signIn[key][lang];
			}
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
			fm.config.placeholder = this.placeholders.signUp[key][lang];
			if (fm.inputType === "checkbox") {
				fm.config.label = this.placeholders.signUp[key][lang];
			}
			newSignUp.push({
				key: key,
				elementConfig: fm
			});
		}

		return { newSignIn, newSignUp };
	};
	imageHandler = event => {
		this.setState({ imageError: null });
		const error = [ "Размер файла не должен превышать 2 мегабайт!", "File size should not be greater than 2 mb!" ];
		if (event.target.files[0].size / 1024 / 1024 > 2) {
			this.setState({ imageError: error[this.props.lang] });
		} else {
			this.setState({
				selectedFile: event.target.files[0]
			});
		}
	};
	googleClickedHanlder = () => {};

	responseGoogle = response => {
		console.log(response);
	};
	render() {
		const form = this.formLang();
		const modal = this.state.isModalOpened && (
			<Modal opened={this.state.isModalOpened} backdropClicked={this.backdropHandler}>
				<SignForm
					responseGoogle={this.responseGoogle}
					imageError={this.state.imageError}
					modalClosed={this.backdropHandler}
					errorMessage={this.props.hasError}
					lang={this.props.lang}
					loading={this.props.isLoading}
					formSubmitted={this.formSubmitHandler}
					isSignInValid={this.state.isSignInValid}
					isSignUpValid={this.state.isSignUpValid}
					isSignIn={this.state.isSignIn}
					signIn={form.newSignIn}
					signUp={form.newSignUp}
					signInClicked={this.signInClickedHandler}
					signUpClicked={this.signUpClickedHandler}
					inputChanged={this.inputChangedHandler}
					imageChanged={this.imageHandler}
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
						lang={this.props.lang}
						langClicked={this.props.langClicked}
						drawerOpened={this.openDrawerHandler}
						signInClicked={this.signInClickedHandler}
						signUpClicked={this.signUpClickedHandler}
					/>
					<Hidden mdUp>
						<Drawer open={this.state.drawerLeft} onClose={this.closeDrawerHandler} anchor="right">
							<NavigationItems
								avatar={this.props.authAvatar}
								lang={this.props.lang}
								vertical
								logout={this.props.onLogout}
								drawerClosed={this.closeDrawerHandler}
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
		isFormFlush: state.auth.formFlush,
		hasError: state.auth.error,
		authAvatar: state.auth.avatar
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
