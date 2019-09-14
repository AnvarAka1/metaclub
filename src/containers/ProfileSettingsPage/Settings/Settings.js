import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "../../../components/Grid/Grid";
import Hidden from "@material-ui/core/Hidden";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions/index";
import axios from "../../../axios-db";
import Button from "../../../components/UI/Button/Button";
export class Settings extends Component {
	placeholders = {
		form: {
			name: [ "Имя", "Name" ],
			position: [ "Место проживания", "Position" ],
			email: [ "Email", "Email" ],
			fpassword: [ "Пароль", "Password" ],
			spassword: [ "Подтвердите пароль", "Confirm password" ]
		}
	};
	state = {
		form: {
			name: {
				inputType: "input",
				config: {
					type: "text",
					name: "name",
					placeholder: "Name"
				},
				grid: {
					xs: 12,
					sm: 6
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
			position: {
				inputType: "input",
				config: {
					type: "text",
					name: "position",
					placeholder: "Position"
				},
				grid: {
					xs: 12,
					sm: 6
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
			email: {
				inputType: "input",
				config: {
					disabled: true,
					type: "email",
					name: "email",
					placeholder: "Email"
				},
				isValid: true,
				grid: {
					xs: 12,
					sm: 6
				},
				value: ""
			},

			fpassword: {
				inputType: "input",
				config: {
					type: "password",
					name: "fpassword",
					placeholder: "Password"
				},
				grid: {
					xs: 12,
					sm: 6
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
			spassword: {
				inputType: "input",
				config: {
					type: "password",
					name: "spassword",
					placeholder: "Confirm password"
				},
				grid: {
					xs: 12,
					sm: 6
				},
				validation: {
					required: true,
					minChar: 6,
					maxChar: 20
				},
				isValid: false,
				touched: false,
				value: ""
			}
		},
		formIsValid: false
	};
	componentDidMount() {
		const id = localStorage.getItem("id");
		let formAll = {};
		axios.get(`/users/${id}`).then(res => {
			console.log(res);
			const { data } = res;

			const form = {
				...this.state.form
			};
			const name = {
				...form.name,
				value: data.name ? data.name : ""
			};
			const position = {
				...form.position,
				value: data.position ? data.position : ""
			};
			const email = {
				...form.email,
				value: data.email ? data.email : ""
			};
			formAll = {
				...form,
				name: name,
				position: position,
				email: email
			};
			console.log(formAll);
			this.setState({ form: formAll });
		});

		console.log(this.props.email);
	}
	formLang = () => {
		const { lang } = this.props;
		let form = { ...this.state.form };
		let newForm = [];
		// eslint-disable-next-line
		for (let key in form) {
			let fm = {
				...form[key],
				...form[key].config
			};
			console.log(lang);
			fm.config.placeholder = this.placeholders.form[key][lang];
			newForm.push({
				key: key,
				elementConfig: fm
			});
		}

		return newForm;
	};
	inputChangedHandler = (event, inputIdentifier) => {
		let form = {};
		form = { ...this.state.form };
		const { isValid, errMessage } = this.checkValidity(event.target.value, form[inputIdentifier].validation);
		form[inputIdentifier].value = event.target.value;
		form[inputIdentifier].touched = true;
		form[inputIdentifier].isValid = isValid;
		form[inputIdentifier].errMessage = errMessage;
		const valid = this.checkFormValidity();
		this.setState({ signIn: form, formIsValid: valid });
	};
	checkFormValidity = () => {
		let validForm = true;
		const form = { ...this.state.form };
		// eslint-disable-next-line
		for (let key in form) {
			validForm = form[key].isValid && validForm;
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
	formSubmitHandler = event => {
		event.preventDefault();
		const data = {
			name: this.state.form.name.value,
			position: this.state.form.position.value,
			email: this.state.form.email.value,
			password: this.state.form.fpassword.value
		};
		axios
			.put("/users", data, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`
				}
			})
			.then(res => {
				console.log(res.data);
			});
	};
	render() {
		const content = {
			login: [ "Войти", "Login" ],
			reg: [ "Зарегистрироваться", "Register" ],
			sinHeader: [ "Авторизация", "Sign in" ],
			supHeader: [ "Регистрация", "Sign up" ],
			signInBtn: [ "Войти", "Sign in" ],
			signUpBtn: [ "Зарегистрироваться", "Sign up" ]
		};
		const newForm = this.formLang();
		const form = newForm.map(form => {
			return (
				<Grid item key={form.key} {...form.elementConfig.grid}>
					<Input
						changed={event => this.inputChangedHandler(event, form.key)}
						elementConfig={form.elementConfig}
					/>
				</Grid>
			);
		});
		return (
			<form style={{ width: "100%" }} onSubmit={this.formSubmitHandler}>
				<Grid container spacing={3}>
					{form}
					<Hidden smDown>
						<Grid item xs={8} />
					</Hidden>
					<Grid item sm={4} xs={12}>
						<Button flatten wide disabled={!this.state.formIsValid}>
							{content.login[this.props.lang]}
						</Button>
					</Grid>
				</Grid>
			</form>
		);
	}
}

const mapStateToProps = state => {
	return {
		lang: state.lang.lang,
		name: state.auth.name,
		email: state.auth.email,
		avatar: state.auth.avatar,
		position: state.auth.position
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onFormSubmit: () => dispatch(actions)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
