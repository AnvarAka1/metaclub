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
	placeholders = {
		form: {
			title: [ "Название", "Title" ]
		}
	};

	state = {
		form: {
			title: {
				inputType: "input",
				config: {
					type: "text",
					name: "title",
					placeholder: "Title"
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
			const data = res.data;
			const options = data.map(option => {
				return { value: option.id, displayValue: [ option.name_ru, option.name_en ] };
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
			this.setState({ form: form, loading: false });
		});
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
				this.setState({ error: err.response });
			});
	};
	imageHandler = event => {
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
	formLang = () => {
		const { lang } = this.props;
		let form = { ...this.state.form };

		let fm = null;
		fm = {
			...form.title,
			...form.title.config
		};
		fm.config.placeholder = this.placeholders.form.title[lang];
		form.title = fm;

		return form;
	};
	render() {
		const form = this.formLang();
		const content = {
			message: [ "Добавьте фотографию", "Add a photo" ],
			successMessage: [ "Ваша статья была успешно создана!", "Your article has been successfully created!" ]
		};
		return (
			<ArticleForm
				error={this.state.error}
				imageError={this.state.imageError}
				sent={this.state.sent}
				form={form}
				lang={this.props.lang}
				loading={this.state.loading}
				inputChanged={this.inputChangedHandler}
				formSubmitted={this.formSubmitHandler}
				imageChanged={this.imageHandler}
				initialEditorData=""
				editorChanged={this.changeHandler}
				{...content}
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
