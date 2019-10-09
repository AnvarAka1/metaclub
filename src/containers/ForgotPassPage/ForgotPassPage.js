import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-db";
import FormCard from "../../components/FormCard/FormCard";
export class ForgotPassPage extends Component {
	placeholders = {
		form: {
			email: [ "Введите свой Email", "Enter your Email" ]
		}
	};
	state = {
		form: {
			email: {
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
			}
		},
		sent: false
	};
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

			fm.config.placeholder = this.placeholders.form[key][lang];
			newForm.push({
				key: key,
				elementConfig: fm
			});
		}

		return newForm;
	};
	inputChangeHandler = (event, inputIdentifier) => {
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
		if (!rules.required && value.trim() === "") {
			isValid = true;
		}
		if (rules.target) {
			let fPass;
			// eslint-disable-next-line
			for (let key in this.state.form) {
				if (key === rules.target) {
					fPass = this.state.form[key];
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
	formSubmitHandler = event => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("email", this.state.form.email.value);
		axios
			.post("/reset", formData)
			.then(res => {
				this.setState({ sent: true });
			})
			.catch(err => console.log(err));
	};
	render() {
		const content = {
			header: [ "Сброс пароля", "Reset password" ],
			button: [ "Отправить", "Submit" ],
			message: [
				"Проверьте почту. Мы выслали вам новый пароль",
				"Check your Email. We have sent you a new password"
			]
		};

		const form = this.formLang();

		return (
			<FormCard
				form={form}
				lang={this.props.lang}
				content={content}
				sent={this.state.sent}
				inputChanged={this.inputChangeHandler}
				formSubmitted={this.formSubmitHandler}
			/>
		);
	}
}
const mapStateToProps = state => {
	return {
		lang: state.lang.lang
	};
};

export default connect(mapStateToProps)(ForgotPassPage);
