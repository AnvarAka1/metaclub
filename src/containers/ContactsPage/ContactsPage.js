import React, { Component } from "react";
import Grid from "../../components/Grid/Grid";
import Header from "../../components/UI/Header/Header";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Hidden from "@material-ui/core/Hidden";
import Text from "../../components/UI/Text/Text";
import MsgImage from "../../assets/images/contact/message.png";
import Tilt from "react-tilt";
import { connect } from "react-redux";
import axios from "../../axios-db";
export class ContactsPage extends Component {
	placeholders = {
		name: [ "Ваше имя", "Your name" ],
		email: [ "Ваша эл.почта", "Your email" ],
		topic: [ "Тема", "Topic" ],
		text: [ "Отзыв / Вопрос / Предложение", "Response / Question / Offer" ]
	};
	state = {
		form: {
			name: {
				inputType: "input",
				config: {
					name: "name",
					placeholder: "",
					type: "text"
				},
				grid: {
					sm: 6,
					xs: 12
				},

				value: ""
			},

			email: {
				inputType: "input",
				config: {
					name: "email",
					placeholder: "",
					type: "email"
				},
				grid: {
					sm: 6,
					xs: 12
				},
				value: ""
			},
			topic: {
				inputType: "input",
				config: {
					name: "topic",
					placeholder: "",
					type: "text"
				},
				grid: {
					sm: 12,
					xs: 12
				},

				value: ""
			},
			text: {
				inputType: "textarea",
				config: {
					name: "message",
					placeholder: "",
					type: "text"
				},
				grid: {
					sm: 12,
					xs: 12
				},
				value: ""
			}
		},
		sent: null,
		error: null
	};
	inputChangeHandler = (event, inputIdentifier) => {
		const form = {
			...this.state.form
		};
		form[inputIdentifier].value = event.target.value;
		this.setState({ form: form });
	};
	formSubmitHandler = event => {
		event.preventDefault();

		const message = [ "Ваш запрос был успешно отправлен!", "Your request has been successfully sent!" ];
		this.setState({ sent: null, error: null });
		const formData = new FormData();
		formData.append("name", this.state.form.name.value);
		formData.append("topic", this.state.form.topic.value);
		formData.append("email", this.state.form.email.value);
		formData.append("body", this.state.form.text.value);

		axios
			.post("/contacts/create", formData)
			.then(res => {
				this.setState({ sent: message[this.props.lang] });
			})
			.catch(err => {
				this.setState({ sent: err.data, error: true });
			});
		// axios
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
			fm.config.placeholder = this.placeholders[key][lang];
			newForm.push({
				key: key,
				elementConfig: fm
			});
		}

		return newForm;
	};
	render() {
		// let formArray = [];
		// // eslint-disable-next-line
		// for (let key in this.state.form) {
		// 	formArray.push({ key: key, elementConfig: this.state.form[key] });
		// }

		const newForm = this.formLang();

		const form = newForm.map(f => {
			return (
				<Grid item key={f.key} {...f.elementConfig.grid}>
					<Input changed={event => this.inputChangeHandler(event, f.key)} elementConfig={f.elementConfig} />
				</Grid>
			);
		});

		const content = {
			mainHeader: [ "Связаться с нами", "Contact us" ],
			header: [ "Детали вашей заявки", "Details of your application" ],
			text: [
				"Описывайте ситуацию как можно подробнее, от этого зависит скорость и качество ответа на вопрос",
				"Describe the situation as detailed as possible, the speed and quality of the answer to the question depends on this."
			],
			button: [ "Отправить", "Send" ]
		};

		return (
			<Grid con="true" container>
				<Hidden smDown>
					<Grid item sm={6}>
						<div style={{ paddingTop: "100px", textAlign: "center" }}>
							<Tilt>
								<img style={{ width: "70%" }} src={MsgImage} alt="Contact us" />
							</Tilt>
						</div>
					</Grid>
				</Hidden>
				<Grid item xs={12} sm={12} md={6}>
					<Header mtbBig h3 center thin>
						{content.mainHeader[this.props.lang]}
					</Header>

					<form style={{ padding: "0 20px" }} onSubmit={this.formSubmitHandler}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Header h5>{content.header[this.props.lang]}</Header>
								<Text mtb>{content.text[this.props.lang]}</Text>
							</Grid>
							{form}
							{this.state.sent && (
								<Grid item xs={12}>
									<Header h4 center normal color={!this.state.error ? "green" : "red"}>
										{this.state.sent}
									</Header>
								</Grid>
							)}
							<Hidden xsDown>
								<Grid item sm={9} />
							</Hidden>
							<Grid item xs={12} sm={3}>
								<Button wide flatten>
									{content.button[this.props.lang]}
								</Button>
							</Grid>
						</Grid>
					</form>
				</Grid>
			</Grid>
		);
	}
}
const mapStateToProps = state => {
	return {
		lang: state.lang.lang
	};
};

export default connect(mapStateToProps)(ContactsPage);
