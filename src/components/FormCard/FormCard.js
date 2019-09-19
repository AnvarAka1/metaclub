import React from "react";
import Paper from "../UI/Paper/Paper";
import Button from "../UI/Button/Button";
import Header from "../UI/Header/Header";
import Input from "../UI/Input/Input";
import Grid from "../Grid/Grid";
import Hidden from "@material-ui/core/Hidden";
const formCard = props => {
	const message = props.sent ? (
		<Grid item xs={12}>
			<Header h6 color="green">
				{props.content.message[props.lang]}
			</Header>
		</Grid>
	) : null;
	const passResetForm = props.form.map(e => {
		return (
			<Grid item key={e.key} xs={12}>
				<Input elementConfig={e.elementConfig} changed={event => props.inputChanged(event, e.key)} />
			</Grid>
		);
	});
	return (
		<form style={{ marginTop: "50px" }} onSubmit={props.formSubmitted}>
			<Paper narrow center comment>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Header mt h5 center>
							{props.content.header[props.lang]}
						</Header>
					</Grid>
					{passResetForm}
					{message}
					<Hidden xsDown>
						<Grid item sm={8} />
					</Hidden>
					<Grid item sm={4} xs={12}>
						<Button wide flatten>
							{props.content.button[props.lang]}
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</form>
	);
};

export default formCard;
