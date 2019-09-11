import React, { Component } from "react";
import Grid from "../../components/Grid/Grid";
import Header from "../../components/UI/Header/Header";
export class ProfileSettingsPage extends Component {
	state = {
		selected: 0
	};
	render() {
		return (
			<Grid item xs={12} mt="true">
				<Grid container con="true" spacing={5}>
					<Grid item xs={12}>
						<Header h3 center>
							Settings
						</Header>
					</Grid>
					<Grid item xs={12}>
						{/* Buttons */}
					</Grid>
					<Grid item xs={12} sm={4}>
						{/* image */}
					</Grid>
					<Grid item xs={12} sm={8}>
						{/* content */}
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default ProfileSettingsPage;
