import React, { Component } from "react";
import axios from "../../../axios-db";
import { connect } from "react-redux";
import ArticleForm from "../../../components/ArticleForm/ArticleForm";
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
		formData.append(
			"image",
			this.state.selectedFile && this.state.selectedFile,
			this.state.selectedFile && this.state.selectedFile.name
		);
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
		return (
			<ArticleForm
				error={this.state.error}
				imageError={this.state.imageError}
				sent={this.state.sent}
				form={this.state.form}
				loading={this.state.loading}
				inputChanged={this.inputChangedHandler}
				formSubmitted={this.formSubmitHandler}
				imageChanged={this.imageHandler}
				initialEditorData=""
				editorChanged={this.changeHandler}
			/>
		);
	}
}
const mapStateToProps = state => {
	return {
		lang: state.lang.lang
	};
};
export default connect(mapStateToProps)(AddArticle);
