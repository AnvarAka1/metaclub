import React, { Component } from "react";
import Grid from "../../components/Grid/Grid";
import Menu from "../../components/Menu/Menu";
import NewsItems from "../../components/NewsItems/NewsItems";
import axios from "../../axios-db";
import Spinner from "../../components/Spinner/Spinner";
export class ArticlesPage extends Component {
	state = {
		menu: [
			{
				id: -1,
				name_en: "All",
				name_ru: "Все",
				count: 20,
				active: true
			}
		],
		articles: null,
		loading: true
	};
	componentDidMount() {
		axios
			.get("/articles")
			.then(res => {
				// console.log(res.data);
				this.setState({ articles: res.data });
			})
			.catch(err => {
				console.log("Error ", err);
			});
		axios.get("/categories").then(res => {
			console.log(res.data);
			const cats = this.state.menu.slice();
			let catsCopy = res.data.slice();
			catsCopy = catsCopy.map(cat => {
				return { ...cat, active: false };
			});
			for (let i = 0; i < catsCopy.length; i++) {
				cats.push(catsCopy[i]);
			}
			console.log(catsCopy);

			this.setState({ menu: cats, loading: false });
		});
	}
	categoryHandler = (event, id) => {
		let cats = this.state.menu.slice();
		for (let i = 0; i < cats.length; i++) {
			cats[i].active = false;
			if (cats[i].id === id) {
				cats[i].active = true;
			}
		}
		if (id < 0) {
			axios
				.get(`/articles`)
				.then(res => {
					this.setState({ articles: res.data });
				})
				.catch(err => console.log(err));
			return;
		}
		this.setState({ menu: cats });
		axios
			.get(`/articles/category/${id}`)
			.then(res => {
				this.setState({ articles: res.data });
			})
			.catch(err => console.log(err));
	};
	articleHandler = (event, id) => {
		event.preventDefault();
		// this.props.history.push(`/articles/${id}`);
		window.scrollTo({ top: "0" });
	};
	render() {
		let newsItems = <Spinner />;
		let menu = <Spinner />;
		if (!this.state.loading) {
			newsItems = this.state.articles && (
				<NewsItems articleClicked={this.articleHandler} wide news={this.state.articles.data} />
			);
			menu = this.state.menu && <Menu clicked={this.categoryHandler} menu={this.state.menu} />;
		}
		return (
			<Grid con="true" container spacing={3}>
				<Grid item xs={12} style={{ marginTop: "50px" }}>
					<Grid container spacing={5}>
						<Grid item sm={3} xs={12}>
							{menu}
						</Grid>
						<Grid item md={8} sm={9} xs={12}>
							<Grid container spacing={5}>
								{newsItems}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default ArticlesPage;
