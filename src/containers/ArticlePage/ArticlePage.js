import React, { Component } from "react";
import Grid from "../../components/Grid/Grid";
import MainImage from "../../components/MainImage/MainImage";
import Header from "../../components/UI/Header/Header";
import Text from "../../components/UI/Text/Text";
import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import ProfilePhoto from "../../assets/images/profile/profile.png";
import Comments from "../../components/Comments/Comments";
import Paper from "../../components/UI/Paper/Paper";
import axios from "../../axios-db";
export class ArticlePage extends Component {
	state = {
		commentForm: {
			comment: {
				inputType: "textarea",
				config: {
					name: "comment",
					placeholder: "Добавить комментарий...",
					type: "text"
				},
				value: ""
			}
		},
		profile: {
			id: 3,
			photo: ProfilePhoto,
			name: "Томас Эдисон",
			position: [ "изобретатель и предприниматель", "Inventor and entrepreneur" ],
			artCount: 3
		},
		article: null,
		comments: [
			{
				id: 0,
				profile: {
					id: 25,
					photo: ProfilePhoto,
					name: "John Smith",
					text:
						"Годовой параллакс одномерно выбирает осциллятор. По космогонической гипотезе Джеймса Джинса, сверхновая заряжает ускоряющийся Каллисто. Вещество синхронно. Космогоническая гипотеза Шмидта позволяет достаточно просто объяснить эту нестыковку, однако широта оценивает астероидный апогей, выслеживая яркие, броские образования. Галактика оценивает Млечный Путь."
				}
			},
			{
				id: 1,
				profile: {
					id: 26,
					photo: ProfilePhoto,
					name: "Anvar",
					text:
						"Джинса, сверхновая заряжает ускоряющийся Каллисто. Вещество синхронно. Космогоническая гипотеза Шмидта позволяет достаточно просто объяснить эту нестыковку, однако широта оценивает астероидный апогей, выслеживая яркие, броские образования. Галактика оценивает Млечный Путь."
				}
			}
		],
		lang: 0
	};
	componentDidMount() {
		const { id } = this.props.match.params;
		axios
			.get(`/articles/${id}`)
			.then(res => {
				console.log(res.data);
				this.setState({ article: res.data });
			})
			.catch(err => {
				console.log("Error ", err);
			});
	}
	commentHandler = (event, id) => {
		this.props.history.push(`/profiles/${id}`);
		window.scrollTo({ top: "0" });
	};
	commentSubmitHandler = event => {
		event.preventDefault();
		//axios.then
		const comments = this.state.comments.slice();
		comments.push({
			id: comments.length,
			profile: {
				id: comments[comments.length - 1].id + 1,
				name: "Anvar_AKA",
				photo: ProfilePhoto,
				text: this.state.commentForm.comment.value
			}
		});
		this.setState({ comments: comments });
	};
	commentChangedHandler = (event, inputIdentifier) => {
		const value = event.target.value;
		const commentForm = { ...this.state.commentForm };
		commentForm[inputIdentifier].value = value;
		this.setState({ commentForm: commentForm });
	};
	viewProfileHandler = (event, id) => {
		// redirect

		this.props.history.push(`/profiles/${id}`);
		window.scrollTo({ top: "0" });
	};
	render() {
		const image = this.state.article ? (
			<MainImage src={this.state.article.image} alt={this.state.article.title} />
		) : (
			"Wait"
		);
		const article = this.state.article ? (
			<Paper blank article>
				<Header color="#333" mb h2>
					{this.state.article.title}
				</Header>
				<Text textStyle={{ lineHeight: "40px" }}>{this.state.article.body}</Text>
			</Paper>
		) : (
			"Wait"
		);
		return (
			<React.Fragment>
				<Grid container mbbig="true">
					{image}
				</Grid>
				<Grid container con="true" spacing={5}>
					<Grid item sm={1} />
					<Grid item sm={7}>
						{article}
						<Comments
							commentForm={this.state.commentForm}
							commentClicked={this.commentHandler}
							commentSubmitted={this.commentSubmitHandler}
							commentChanged={this.commentChangedHandler}
							comments={this.state.comments}
						/>
					</Grid>
					<Grid item sm={3} xs={12}>
						<ProfileCard
							clicked={this.viewProfileHandler}
							lang={this.state.lang}
							profile={this.state.profile}
							viewProfile
						/>
					</Grid>
					<Grid item sm={1} />
				</Grid>
			</React.Fragment>
		);
	}
}

export default ArticlePage;
