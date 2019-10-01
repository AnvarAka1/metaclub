import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
export class GoogleAccount extends Component {
	componentDidMount() {
		const query = queryString.parse(this.props.location.search);
		console.log(query);
		this.props.onAuth(query.name, query.email, null, null, null, true);
	}
	render() {
		return <h1>Wait for redirect...</h1>;
	}
}
const mapStateToProps = state => {
	return {
		isAuthorized: state.auth.token !== null,
		isLoading: state.auth.loading,
		isFormFlush: state.auth.formFlush,
		hasError: state.auth.error,
		authAvatar: state.auth.avatar
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuth: (name, email, password, avatar, position, isSignIn) =>
			dispatch(actions.auth(name, email, password, avatar, position, isSignIn)),
		onLogout: () => dispatch(actions.logout()),
		onFormFlush: () => dispatch(actions.authFormFlush())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(GoogleAccount);
