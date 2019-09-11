import React, { Component } from "react";
import Paper from "../../components/UI/Paper/Paper";
import Grid from "../../components/Grid/Grid";
import Header from "../../components/UI/Header/Header";
import QuestionCards from "../../components/QuestionCards/QuestionCards";
import axios from "../../axios-db";
class FaqPage extends Component {
	state = {
		questionsArray: null
	};

	componentDidMount() {
		axios
			.get("/faqs")
			.then(res => {
				console.log(res.data);
				this.setState({ questionsArray: res.data });
			})
			.catch(err => {
				console.log(err);
			});
	}
	toggleHandler = (event, id) => {
		let questionsArray = this.state.questionsArray.slice();
		const index = questionsArray.findIndex(question => {
			return question.id === id;
		});

		questionsArray[index].opened = !questionsArray[index].opened;
		this.setState({ questionsArray: questionsArray });
	};
	render() {
		const questions = this.state.questionsArray ? (
			<QuestionCards toggleClicked={this.toggleHandler} questionsArray={this.state.questionsArray} />
		) : (
			"Wait"
		);
		return (
			<Grid con="true" container spacing={3}>
				<Grid item xs={1} />
				<Grid item xs={10}>
					<Header mtbBig h3 center thin>
						F.A.Q
					</Header>
					<Paper>{questions}</Paper>
				</Grid>
			</Grid>
		);
	}
}

export default FaqPage;
