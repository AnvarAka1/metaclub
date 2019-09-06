import React from "react";
import classes from "./Footer.module.css";
import Grid from "../Grid/Grid";
import Social from "../Social/Social";
import Developers from "../Developers/Developers";
import Hidden from "@material-ui/core/Hidden";
import Logo from "../Logo/Logo";
const footer = props => {
	return (
		<footer className={classes.FooterWrapper}>
			<div className={classes.Footer}>
				<Grid container con="true">
					{/* <Grid item xs={12}>
						<Header h3 thin headerStyle={{ marginBottom: "15px" }}>
							{"MetaHash"}
						</Header>
					</Grid> */}
					<Grid item sm={8}>
						<Logo />
					</Grid>
					<Hidden xsDown>
						<Grid item sm={1} />
					</Hidden>
					<Grid item sm={2} xs={12}>
						<Social />
					</Grid>
					<Grid item xs={12}>
						<Developers />
					</Grid>
				</Grid>
			</div>
		</footer>
	);
};

export default footer;
