import React from "react";
import classes from "./ProfileCard.module.css";
import Header from "../../UI/Header/Header";
import Text from "../../UI/Text/Text";
import Button from "../../UI/Button/Button";
import { NavLink } from "react-router-dom";
function profileCard(props) {
	const content = {
		articles: [ "Статьи", "Articles" ],
		button: [ "Посмотреть профиль", "View profile" ]
	};
	const { lang } = props;
	const button = props.viewProfile ? (
		<NavLink to={`/users/${props.profile.id}`}>
			<Button round accent>
				{content.button[lang]}
			</Button>
		</NavLink>
	) : null;
	return (
		<div className={classes.ProfileCard}>
			<div className={classes.Profile}>
				<div className={classes.ImageWrapper}>
					<img src={props.profile.avatar} alt={props.profile.name} />
				</div>
				<Header h4>{props.profile.name}</Header>
				<Text>{props.profile.position}</Text>
			</div>
			<div>
				<p className={classes.Articles}>{content.articles[lang]}:</p>
				<Header h3 center>
					{props.profile.total}
				</Header>
				<div style={{ textAlign: "center", marginTop: "15px" }}>{button}</div>
			</div>
		</div>
	);
}

export default profileCard;
