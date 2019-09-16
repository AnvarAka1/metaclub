import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "../../../components/Grid/Grid";
import Hidden from "@material-ui/core/Hidden";
import Input from "../../../components/UI/Input/Input";
import axios from "../../../axios-db";
import Button from "../../../components/UI/Button/Button";
import ProfileCard from "../../../components/Profile/ProfileCard/ProfileCard";
import Spinner from "../../../components/Spinner/Spinner";
import Header from "../../../components/UI/Header/Header";
export class Settings extends Component {
	placeholders = {
		form: {
			name: [ "Имя", "Name" ],
			position: [ "Должность", "Position" ],
			email: [ "Email", "Email" ],
			fpassword: [ "Нынешний пароль", "Current password" ],
			spassword: [ "Новый пароль", "New password" ],
			tpassword: [ "Подтвердите пароль", "Confirm password" ]
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
					sm: 12
				},
				validation: {
					required: true,
					minChar: 6,
					maxChar: 20
				},
				isValid: true,
				touched: true,
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
					sm: 12
				},
				validation: {
					required: true,
					minChar: 6,
					maxChar: 20
				},
				isValid: true,
				touched: true,
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
					sm: 12
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
					sm: 12
				},
				validation: {
					minChar: 6,
					maxChar: 20
				},
				isValid: true,
				touched: true,
				value: ""
			},
			spassword: {
				inputType: "input",
				config: {
					type: "password",
					name: "spassword",
					placeholder: "New password"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				validation: {
					minChar: 6,
					maxChar: 20
				},
				isValid: true,
				touched: true,
				value: ""
			},
			tpassword: {
				inputType: "input",
				config: {
					type: "password",
					name: "fpassword",
					placeholder: "Confirm password"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				validation: {
					minChar: 6,
					maxChar: 20,
					target: "spassword"
				},
				isValid: true,
				touched: true,
				value: ""
			}
		},
		selectedFile: null,
		sent: false,
		error: null,
		imageError: null,
		loading: true,
		profile: null,
		formIsValid: true
	};
	componentDidMount() {
		const id = localStorage.getItem("id");
		let profile = null;

		let formAll = {};
		this.setState({ loading: true });
		axios
			.get(`/users/${id}`)
			.then(res => {
				console.log(res);
				const { data } = res;
				profile = data;
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
				console.log(profile);

				return axios.get(`/articles/user/${id}`);
			})
			.then(res => {
				const total = res.data.total;
				profile.total = total;
				this.setState({ form: formAll, profile: profile, loading: false });
			})
			.catch(err => console.log(err));
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
		if (!rules.required && value.trim() === "") {
			isValid = true;
		}
		if (rules.target) {
			console.log("PassEntered");
			let fPass;
			// eslint-disable-next-line
			for (let key in this.state.form) {
				if (key === rules.target) {
					console.log("Found key");
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

		let formData = new FormData();
		formData.append("name", this.state.form.name.value);
		formData.append("position", this.state.form.position.value);
		formData.append("email", this.state.form.email.value);
		if (this.state.form.fpassword.value === "" || this.state.form.fpassword.value === null) {
			console.log("patruess");
		} else {
			formData.append("password", this.state.form.fpassword.value);
			console.log("word");
		}
		formData.append("_method", "PUT");
		axios
			.post("/users", formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`
				}
			})
			.then(res => {
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};
	imageHandler = event => {
		console.log(event.target.files[0]);
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
	render() {
		const content = {
			login: [ "Войти", "Login" ],
			reg: [ "Зарегистрироваться", "Register" ],
			sinHeader: [ "Авторизация", "Sign in" ],
			supHeader: [ "Регистрация", "Sign up" ],
			signInBtn: [ "Войти", "Sign in" ],
			signUpBtn: [ "Зарегистрироваться", "Sign up" ]
		};
		const errorMessage = [];
		let eMessage = null;
		if (this.state.error) {
			// eslint-disable-next-line
			for (let key in this.state.error.data) {
				errorMessage.push({ key: key, message: this.state.error.data[key] });
			}
			eMessage = errorMessage.map(err => {
				return (
					<Header key={err.key} color="red" h6>
						{err.message}
					</Header>
				);
			});
			eMessage = (
				<Grid item xs={12}>
					{eMessage}
				</Grid>
			);
		}
		let imageError = this.state.imageError ? (
			<Grid item xs={12}>
				<Header color="red" h6>
					{this.state.imageError}
				</Header>
			</Grid>
		) : null;
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
		let profileCard = <Spinner />;
		if (!this.state.loading) {
			profileCard = <ProfileCard lang={this.props.lang} profile={this.state.profile} />;
		}
		return (
			<form style={{ width: "100%" }} onSubmit={this.formSubmitHandler}>
				<Grid container spacing={3}>
					<Grid item sm={3} xs={12}>
						{profileCard}
					</Grid>
					<Grid item sm={9} xs={12}>
						<Grid container spacing={3}>
							<Grid item sm={12} xs={12}>
								<Input
									elementConfig={{
										inputType: "file",
										isValid: true,
										config: {
											type: "file"
										}
									}}
									changed={this.imageHandler}
								/>
								{eMessage}
								{imageError}
							</Grid>
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
					</Grid>
				</Grid>
			</form>
		);
	}
}

const mapStateToProps = state => {
	return {
		lang: state.lang.lang
	};
};

export default connect(mapStateToProps)(Settings);
