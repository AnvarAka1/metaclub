import React, { Component } from "react";
import Paper from "../../components/UI/Paper/Paper";
import Grid from "../../components/Grid/Grid";
import Header from "../../components/UI/Header/Header";
import QuestionCards from "../../components/QuestionCards/QuestionCards";
import axios from "../../axios-db";
import Spinner from "../../components/Spinner/Spinner";
import { connect } from "react-redux";
class FaqPage extends Component {
	state = {
		questionsArray: null,
		loading: true
	};

	componentDidMount() {
		axios
			.get("/faqs")
			.then(res => {
				this.setState({ questionsArray: res.data, loading: false });
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
		let questions = <Spinner />;
		if (!this.state.loading) {
			questions = this.state.questionsArray && (
				<QuestionCards
					lang={this.props.lang}
					toggleClicked={this.toggleHandler}
					questionsArray={this.state.questionsArray}
				/>
			);
		}
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
const mapStateToProps = state => {
	return {
		lang: state.lang.lang
	};
};

export default connect(mapStateToProps)(FaqPage);
