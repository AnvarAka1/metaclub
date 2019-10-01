import React, { Component } from "react";
import Header from "../../components/UI/Header/Header";
import Text from "../../components/UI/Text/Text";
import Paper from "../../components/UI/Paper/Paper";
import Grid from "../../components/Grid/Grid";
import { connect } from "react-redux";
export class AgreementPage extends Component {
	render() {
		const content = {
			header: [ "Условия пользовательского соглашения", "Terms of use agreement" ],
			text: [ "Кое какие условия", "Some terms" ]
		};
		return (
			<Grid container con="true" spacing={5}>
				<Grid item xs={12}>
					<Paper blank>
						<Header h3 center>
							{content.header[this.props.lang]}
						</Header>
						<Text center>{content.text[this.props.lang]}</Text>
					</Paper>
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
export default connect(mapStateToProps)(AgreementPage);
