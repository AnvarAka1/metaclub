import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "../../../axios-db";
import Input from "../../../components/UI/Input/Input";
import Grid from "../../../components/Grid/Grid";
import Spinner from "../../../components/Spinner/Spinner";
import Header from "../../../components/UI/Header/Header";
import Button from "../../../components/UI/Button/Button";
import Hidden from "@material-ui/core/Hidden";
import { connect } from "react-redux";
export class AddArticle extends Component {
	constructor(props) {
		super(props);
		this.titleInput = null;
	}
	globalData = "";
	state = {
		form: {
			title: {
				inputType: "input",
				config: {
					type: "text",
					name: "title",
					placeholder: "title"
				},
				grid: {
					xs: 12,
					sm: 12
				},
				validation: {
					required: true
				},
				isValid: false,
				errMessage: "",
				touched: false,
				value: ""
			},

			category: {
				name: "category",
				value: null,
				inputType: "select",
				options: null
			}
		},
		selectedFile: null,
		loading: true,
		sent: false,
		error: null,
		imageError: null
	};

	componentDidMount() {
		this.setState({ loading: true });
		axios.get("/categories").then(res => {
			console.log(res.data);
			const data = res.data;
			const options = data.map(option => {
				return { value: option.id, displayValue: this.props.lang ? option.name_en : option.name_ru };
			});
			const category = {
				...this.state.form.category,
				value: options[0].value,
				options: options
			};
			let form = {
				...this.state.form,
				category: category
			};
			console.log(category);
			this.setState({ form: form, loading: false });
		});
		// this.setState({ loading: true });
		// console.log(`/articles/${this.props.match.params.id}`);
		// axios.get(`/articles/${this.props.match.params.id}`).then(res => {
		// 	this.setState({ data: res.data.data, loading: false });
		// });
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const value = event.target.value;
		let form = { ...this.state.form };
		form[inputIdentifier] = {
			...this.state.form[inputIdentifier],
			value: value
		};
		this.setState({ form: form });
	};
	changeHandler = (event, editor) => {
		this.globalData = editor.getData();
	};
	formSubmitHandler = event => {
		event.preventDefault();
		this.setState({ sent: false, error: null });

		let formData = new FormData();
		formData.append("image", this.state.selectedFile, this.state.selectedFile.name);
		formData.append("title", this.state.form.title.value);
		formData.append("body", this.globalData);
		formData.append("category_id", this.state.form.category.value);
		axios
			.post("/articles/create", formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`
				}
			})
			.then(res => {
				// this.props.history.replace("settings/");
				this.setState({ sent: true });
			})
			.catch(err => {
				console.log("Error", err);
				this.setState({ error: err.response });
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
		let message = this.state.sent ? (
			<Grid item xs={12}>
				<Header color="green" h6>
					Your Article has successfully been created
				</Header>
			</Grid>
		) : null;

		const form = { ...this.state.form };
		const formArray = [];
		// eslint-disable-next-line
		for (let key in form) {
			formArray.push({ key: key, elementConfig: form[key] });
		}
		let inputs = <Spinner />;
		if (!this.state.loading) {
			inputs = formArray.map(input => {
				return (
					<Grid key={input.key} item {...input.elementConfig.grid}>
						<Input
							elementConfig={input.elementConfig}
							changed={event => this.inputChangedHandler(event, input.key)}
						/>
					</Grid>
				);
			});
		}

		return (
			<form onSubmit={this.formSubmitHandler}>
				<Grid container con="true" spacing={3}>
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
							changed={this.imageHandler}
						/>
					</Grid>
					<Grid item xs={12}>
						<CKEditor
							editor={ClassicEditor}
							data=""
							onInit={editor => {
								// You can store the "editor" and use when it is needed.
								console.log("Editor is ready to use!", editor);
							}}
							onChange={(event, editor) => this.changeHandler(event, editor)}
						/>
					</Grid>
					{message}
					{eMessage}
					{imageError}
					<Hidden xsDown>
						<Grid item sm={7} />
					</Hidden>
					<Grid item xs={12} sm={5}>
						<Button flatten disabled={this.state.imageError} wide>
							Submit
						</Button>
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
export default connect(mapStateToProps)(AddArticle);
