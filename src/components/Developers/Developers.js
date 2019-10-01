import React from "react";
import classes from "./Developers.module.css";

const developers = props => {
	const devs = (
		<React.Fragment>
			Copyright © 2019 Design is Developed by{" "}
			<span>
				<a href="https://www.facebook.com/Mahkamov4th" target="_blank" rel="noopener noreferrer">
					Koinot Markazi Workshop
				</a>
			</span>
			.
			<br />
			Website is Developed by{" "}
			<span>
				<a href="https://www.facebook.com/anvar.abdulsatarov" target="_blank" rel="noopener noreferrer">
					Anvar_AKA
				</a>
			</span>
			. <br />
			All rights reserved
		</React.Fragment>
	);
	return (
		<p className={classes.Developers}>
			Copyright © 2019
			{props.devs ? devs : null}
		</p>
	);
};

export default developers;
