import React, { Component } from "react";
import axios from "../../../axios-db";
import NewsItems from "../../../components/NewsItems/NewsItems";
import Spinner from "../../../components/Spinner/Spinner";

export class Articles extends Component {
	state = {
		articles: null,
		loading: true
	};
	componentDidMount() {
		axios
			.get("/articles/user", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`
				}
			})
			.then(res => {
				console.log(res.data);
				this.setState({ articles: res.data.data, loading: false });
			});
	}
	render() {
		let newsItems = <Spinner />;
		if (!this.state.loading) {
			newsItems = <NewsItems news={this.state.articles} />;
		}
		return <React.Fragment>{newsItems}</React.Fragment>;
	}
}

export default Articles;
