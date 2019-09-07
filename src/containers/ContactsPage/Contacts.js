import React, { Component } from "react";
import Grid from "../../components/Grid/Grid";
import Header from "../../components/UI/Header/Header";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Hidden from "@material-ui/core/Hidden";
import Text from "../../components/UI/Text/Text";
import MsgImage from "../../assets/images/contact/message.png";
import Tilt from "react-tilt";
export class Contacts extends Component {
	state = {
		footerForm: {
			name: {
				inputType: "input",
				config: {
					name: "name",
					placeholder: "Ваше имя",
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
					placeholder: "Ваша эл.почта",
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
					placeholder: "Тема",
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
					placeholder: "Отзыв / Вопрос / Предложение",

					type: "text"
				},
				grid: {
					sm: 12,
					xs: 12
				},
				value: ""
			}
		}
	};
	inputChangeHandler = (event, inputIdentifier) => {
		const footerForm = {
			...this.state.footerForm
		};
		footerForm[inputIdentifier].value = event.target.value;
		this.setState({ footerForm: footerForm });
	};
	formSubmitHandler = event => {
		event.preventDefault();
		// axios
	};
	render() {
		let footerForm = [];
		// eslint-disable-next-line
		for (let key in this.state.footerForm) {
			footerForm.push({ key: key, elementConfig: this.state.footerForm[key] });
		}

		const form = footerForm.map(f => {
			return (
				<Grid item key={f.key} {...f.elementConfig.grid}>
					<Input changed={event => this.inputChangeHandler(event, f.key)} elementConfig={f.elementConfig} />
				</Grid>
			);
		});

		const textLang = {
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
						Contact Us
					</Header>
					<form style={{ padding: "0 20px" }} onSubmit={this.formSubmitHandler}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Header h5>Детали вашей заявки</Header>
								<Text mtb>
									Описывайте ситуацию как можно подробнее, от этого зависит скорость и качество ответа
									на вопрос
								</Text>
							</Grid>
							{form}
							<Hidden xsDown>
								<Grid item sm={9} />
							</Hidden>
							<Grid item xs={12} sm={3}>
								<Button wide flatten>
									{textLang.button[0]}
								</Button>
							</Grid>
						</Grid>
					</form>
				</Grid>
			</Grid>
		);
	}
}

export default Contacts;
