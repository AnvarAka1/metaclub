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
class Layout extends Component {
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
			upPhone: {
				inputType: "input",
				config: {
					type: "text",
					name: "phone",
					placeholder: "Phone number"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				validation: {
					required: true
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
		// console.log("values = ", name.value, email.value, fpassword.value);
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
				console.log("IS VALID = ", form[key].isValid);
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
			console.log("Here");
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
	render() {
		const modal = this.state.isModalOpened && (
			<Modal opened={this.state.isModalOpened} backdropClicked={this.backdropHandler}>
				<SignForm
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
								drawerClosed={this.props.drawerClosed}
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
