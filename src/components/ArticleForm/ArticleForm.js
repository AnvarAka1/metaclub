import React from "react";
import classes from "./ArticleForm.module.css";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Input from "../UI/Input/Input";
import Grid from "../Grid/Grid";
import Header from "../UI/Header/Header";
import Button from "../UI/Button/Button";
import Hidden from "@material-ui/core/Hidden";
import Spinner from "../Spinner/Spinner";
const articleForm = props => {
	const errorMessage = [];
	let eMessage = null;
	if (props.error) {
		// eslint-disable-next-line
		for (let key in props.error.data) {
			errorMessage.push({ key: key, message: props.error.data[key] });
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
	let imageError = props.imageError ? (
		<Grid item xs={12}>
			<Header color="red" h6>
				{props.imageError}
			</Header>
		</Grid>
	) : null;
	let message = props.sent ? (
		<Grid item xs={12}>
			<Header color="green" h6>
				Your Article has successfully been created
			</Header>
		</Grid>
	) : null;
	const form = { ...props.form };
	const formArray = [];
	// eslint-disable-next-line
	for (let key in form) {
		formArray.push({ key: key, elementConfig: form[key] });
	}
	let inputs = null;

	inputs = formArray.map(input => {
		return (
			<Grid key={input.key} item {...input.elementConfig.grid}>
				<Input elementConfig={input.elementConfig} changed={event => props.inputChanged(event, input.key)} />
			</Grid>
		);
	});

	let contents = <Spinner />;
	if (!props.loading) {
		contents = (
			<React.Fragment>
				{inputs}
				<Grid item xs={12}>
					<Input
						elementConfig={{
							inputType: "file",
							isValid: true,
							config: {
								type: "file"
							}
						}}
						changed={props.imageChanged}
					/>
				</Grid>
				<Grid item xs={12}>
					<CKEditor
						editor={ClassicEditor}
						data={props.initialEditorData}
						onInit={editor => {
							// You can store the "editor" and use when it is needed.
							console.log("Editor is ready to use!", editor);
						}}
						onChange={(event, editor) => props.editorChanged(event, editor)}
					/>
				</Grid>
				{message}
				{eMessage}
				{imageError}
				<Hidden xsDown>
					<Grid item sm={7} />
				</Hidden>
				<Grid item xs={12} sm={5}>
					<Button flatten disabled={props.imageError} wide>
						Submit
					</Button>
				</Grid>
			</React.Fragment>
		);
	}
	return (
		<div className={classes.ArticleForm}>
			<form onSubmit={event => props.formSubmitted(event)}>
				<Grid container con="true" spacing={3}>
					{contents}
				</Grid>
			</form>
		</div>
	);
};

export default articleForm;
