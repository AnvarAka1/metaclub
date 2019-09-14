import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "../../../axios-db";
import Input from "../../../components/UI/Input/Input";
export class AddArticle extends Component {
	globalData = "";
	state = {
		data: null
		// loading: true
	};

	componentDidMount() {
		// this.setState({ loading: true });
		// console.log(`/articles/${this.props.match.params.id}`);
		// axios.get(`/articles/${this.props.match.params.id}`).then(res => {
		// 	this.setState({ data: res.data.data, loading: false });
		// });
	}
	changeHandler = (event, editor) => {
		this.globalData = editor.getData();
	};
	formSubmitHandler = event => {
		event.preventDefault();
		const data = {
			title: "Test",
			image: null,
			body: this.globalData,
			category_id: 1
		};
		axios.post("/articles/create", data, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		});
	};
	render() {
		return (
			<form onSubmit={this.formSubmitHandler}>
				<Input />
				<Input />
				<Input />
				<CKEditor
					editor={ClassicEditor}
					data="<p>Hello from CKEditor 5!</p>"
					onInit={editor => {
						// You can store the "editor" and use when it is needed.
						console.log("Editor is ready to use!", editor);
					}}
					onChange={(event, editor) => this.changeHandler(event, editor)}
				/>
				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default AddArticle;
