import React, { Component } from "react";
import axios from "../../../axios-db";
import NewsItems from "../../../components/NewsItems/NewsItems";
import Spinner from "../../../components/Spinner/Spinner";
import Modal from "../../../components/Modal/Modal";
import AskMenu from "../../../components/AskMenu/AskMenu";
export class Articles extends Component {
	state = {
		articles: null,
		loading: true,
		isModalOpened: false
	};
	id = null;
	componentDidMount() {
		axios
			.get("/articles/user", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`
				}
			})
			.then(res => {
				console.log(res.data);
				this.setState({ articles: res.data, loading: false });
			});
	}
	pageClickHandler = (event, id) => {
		event.preventDefault();
		axios.get(`http://mc.test/api/articles/user?page=${id}`).then(res => {
			console.log(res.data);
			this.setState({ articles: res.data });
		});
	};
	editHandler = (event, id) => {
		console.log("Edit clicked");
	};
	preRemoveHandler = (event, id) => {
		this.id = null;
		console.log("Remove clicked");
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
				console.log(res);
				this.id = null;
				return axios.get("/articles/user", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				});
			})
			.then(res => {
				console.log(res.data);
				this.setState({ articles: res.data, loading: false, isModalOpened: false });
			})
			.catch(err => {
				console.log(err);
				this.id = null;
			});
	};
	modalCloseHandler = () => {
		this.setState({ isModalOpened: false });
		this.id = null;
	};
	render() {
		let newsItems = <Spinner />;
		if (!this.state.loading) {
			newsItems = (
				<NewsItems
					editable
					editClicked={this.editHandler}
					removeClicked={this.preRemoveHandler}
					pageClicked={this.pageClickHandler}
					wide
					news={this.state.articles}
				/>
			);
		}
		return (
			<React.Fragment>
				{this.state.isModalOpened ? (
					<Modal fixed backdropClicked={this.modalCloseHandler}>
						<AskMenu lang={0} yClicked={this.removeHandler} nClicked={this.modalCloseHandler} />
					</Modal>
				) : null}
				{newsItems}
			</React.Fragment>
		);
	}
}

export default Articles;
