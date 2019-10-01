import React, { Component } from "react";
import axios from "../../../axios-db";
import NewsItems from "../../../components/NewsItems/NewsItems";
import Spinner from "../../../components/Spinner/Spinner";
import Modal from "../../../components/Modal/Modal";
import AskMenu from "../../../components/AskMenu/AskMenu";
import ArticleForm from "../../../components/ArticleForm/ArticleForm";
import { connect } from "react-redux";
export class Articles extends Component {
	id = null;
	globalData = null;

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
		formLoading: false,
		selectedFile: null,
		sent: false,
		error: null,
		imageError: null,

		articles: null,
		loading: true,
		isModalOpened: false,
		isEdit: false
	};

	componentDidMount() {
		axios
			.get("/articles/user", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`
				}
			})
			.then(res => {
				this.setState({ articles: res.data, loading: false });
			});
	}
	pageClickHandler = (event, id) => {
		event.preventDefault();
		axios
			.get(`/articles/user?page=${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`
				}
			})
			.then(res => {
				this.setState({ articles: res.data });
			});
	};

	// EDIT BUTTON WAS CLICKED
	editHandler = (event, id) => {
		let catId = null;
		let titleGlobal = null;
		this.id = id;
		let selectedFile = null;
		this.setState({ formLoading: true, isEdit: true });
		axios
			.get(`/articles/${id}`)
			.then(res => {
				catId = res.data.category_id;
				titleGlobal = res.data.title;
				this.globalData = res.data.body;
				selectedFile = res.data.image;
				return axios.get("/categories");
			})
			.then(res => {
				const data = res.data;
				const title = {
					...this.state.form.title,
					value: titleGlobal
				};
				const options = data.map(option => {
					return { value: option[0].id, displayValue: [ option[0].name_en, option[0].name_ru ] };
				});
				const category = {
					...this.state.form.category,
					value: catId,
					options: options
				};
				let form = {
					...this.state.form,
					title: title,
					category: category
				};
				this.setState({ form: form, selectedFile: selectedFile, formLoading: false });
			})
			.catch(err => {
				console.log(err);
			});
		window.scrollTo({ top: "200" });
	};

	// REMOVE BUTTON WAS CLICKED
	preRemoveHandler = (event, id) => {
		this.id = null;
		this.setState({ isModalOpened: true });
		this.id = id;
	};
	removeHandler = () => {
		axios
			.delete(`/articles/${this.id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`
				}
			})
			.then(res => {
				this.id = null;
				return axios.get("/articles/user", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				});
			})
			.then(res => {
				this.setState({ articles: res.data, loading: false, isModalOpened: false });
			})
			.catch(err => {
				this.id = null;
			});
	};
	modalCloseHandler = () => {
		this.setState({ isModalOpened: false });
		this.id = null;
	};
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
		formData.append("_method", "PUT");
		axios
			.post(`/articles/${this.id}`, formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`
				}
			})
			.then(res => {
				// this.props.history.replace("settings/");
				this.setState({ sent: true, loading: true });
				return axios.get("/articles/user", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				});
			})
			.then(res => {
				this.setState({ articles: res.data, loading: false });
			})
			.catch(err => {
				// this.setState({ error: err.response });
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
		let newsItems = <Spinner />;
		let articleForm = null;
		const content = {
			message: [
				"Добавьте новую фотографию, либо оставьте поле пустым, чтобы оставить старую",
				"Add a new photo, or leave the field blank to keep old photo"
			],
			successMessage: [ "Ваша статья была успешно обновлена!", "Your article has been successfully updated!" ]
		};
		if (!this.state.loading) {
			newsItems = (
				<NewsItems
					editable
					editClicked={this.editHandler}
					removeClicked={this.preRemoveHandler}
					pageClicked={this.pageClickHandler}
					// wide
					lang={this.props.lang}
					news={this.state.articles}
				/>
			);
		}
		articleForm = this.state.isEdit ? (
			<ArticleForm
				lang={this.props.lang}
				error={this.state.error}
				imageError={this.state.imageError}
				sent={this.state.sent}
				form={form}
				{...content}
				loading={this.state.formLoading}
				inputChanged={this.inputChangedHandler}
				formSubmitted={this.formSubmitHandler}
				imageChanged={this.imageHandler}
				initialEditorData={this.globalData}
				editorChanged={this.changeHandler}
			/>
		) : null;

		return (
			<React.Fragment>
				{this.state.isModalOpened ? (
					<Modal fixed backdropClicked={this.modalCloseHandler}>
						<AskMenu lang={0} yClicked={this.removeHandler} nClicked={this.modalCloseHandler} />
					</Modal>
				) : null}
				{articleForm}
				{newsItems}
			</React.Fragment>
		);
	}
}
const mapStateToProps = state => {
	return {
		lang: state.lang.lang
	};
};

export default connect(mapStateToProps)(Articles);
