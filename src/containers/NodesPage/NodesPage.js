import React, { Component } from "react";
import Grid from "../../components/Grid/Grid";
import Header from "../../components/UI/Header/Header";
import Spinner from "../../components/Spinner/Spinner";
import axios from "../../axios-db";
import ServerCards from "../../components/ServerCards/ServerCards";
import CopiedText from "../../components/CopiedText/CopiedText";
import { connect } from "react-redux";
export class NodesPage extends Component {
	state = {
		serverCards: null,
		copied: false,
		loading: true
	};
	componentDidMount() {
		axios
			.get("/servers")
			.then(res => {
				this.setState({ serverCards: res.data, loading: false });
			})
			.catch(err => {
				console.log("Error ", err);
			});
	}
	componentDidUpdate() {
		if (this.state.copied) {
			setTimeout(() => {
				this.setState({ copied: false });
			}, 3000);
		}
	}
	copyHandler = () => {
		this.setState({ copied: true });
	};
	render() {
		const content = {
			header: [ "Ноды", "Nodes" ]
		};
		let serverCards = <Spinner />;
		if (!this.state.loading) {
			serverCards = this.state.serverCards && (
				<ServerCards lang={this.props.lang} serverCards={this.state.serverCards} copied={this.copyHandler} />
			);
		}
		return (
			<React.Fragment>
				<Grid container con="true" spacing={3}>
					<Grid item xs={12}>
						<Header mtbBig h3 center thin>
							{content.header[this.props.lang]}
						</Header>
					</Grid>
					<Grid item xs={12}>
						{serverCards}
					</Grid>
				</Grid>
				<CopiedText view={this.state.copied} />
			</React.Fragment>
		);
	}
}
const mapStateToProps = state => {
	return {
		lang: state.lang.lang
	};
};

export default connect(mapStateToProps)(NodesPage);
