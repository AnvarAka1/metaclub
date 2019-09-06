import React, { Component } from "react";
import classes from "./Layout.module.css";
import Drawer from "@material-ui/core/Drawer";
import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems";
import Footer from "../../components/Footer/Footer";
import Hidden from "@material-ui/core/Hidden";
import Modal from "../../components/Modal/Modal";
import SignForm from "../../components/SignForm/SignForm";
class Layout extends Component {
	state = {
		signIn: {
			email: {
				inputType: "input",
				config: {
					type: "email",
					name: "email",
					placeholder: "Name"
				},
				grid: {
					xs: 12,
					sm: 6
				},
				value: ""
			},
			password: {
				inputType: "input",
				config: {
					type: "password",
					name: "password",
					placeholder: "Name"
				},
				grid: {
					xs: 12,
					sm: 6
				},
				value: ""
			},
			remember: {
				inputType: "checkbox",
				config: {
					name: "remember",
					placeholder: "Name"
				},
				grid: {
					xs: 12,
					sm: 6
				},
				value: ""
			}
		},
		signUp: {
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
				value: ""
			},
			phone: {
				inputType: "input",
				config: {
					type: "text",
					name: "phone",
					placeholder: "Name"
				},
				grid: {
					xs: 12,
					sm: 6
				},
				value: ""
			},
			email: {
				inputType: "input",
				config: {
					type: "email",
					name: "email",
					placeholder: "Name"
				},
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
					placeholder: "Name"
				},
				grid: {
					xs: 12,
					sm: 6
				},
				value: ""
			},
			spassword: {
				inputType: "input",
				config: {
					type: "password",
					name: "spassword",
					placeholder: "Name"
				},
				grid: {
					xs: 12,
					sm: 6
				},
				value: ""
			},
			accept: {
				inputType: "checkbox",
				config: {
					name: "accept",
					placeholder: "Name"
				},
				grid: {
					xs: 12,
					sm: 6
				},
				value: ""
			},
			subscribe: {
				inputType: "checkbox",
				config: {
					name: "subscribe",
					placeholder: "Name"
				},
				grid: {
					xs: 12,
					sm: 6
				},
				value: ""
			}
		},
		isSignIn: true,
		isModalOpened: false
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

		form[inputIdentifier].value = event.target.value;
		if (this.state.isSignIn) {
			this.setState({ signIn: form });
		} else {
			this.setState({ signUp: form });
		}
	};

	render() {
		const modal = this.state.isModalOpened && (
			<Modal opened={this.state.isModalOpened} backdropClicked={this.backdropHandler}>
				<SignForm
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

export default Layout;
