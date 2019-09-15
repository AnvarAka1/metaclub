import React from "react";
import classes from "./NewsItem.module.css";
import { NavLink } from "react-router-dom";
import EditMenu from "../EditMenu/EditMenu";
import Header from "../../UI/Header/Header";
const newsItem = props => {
	return (
		<div className={classes.NewsItem} onClick={props.clicked && props.clicked}>
			<div className={classes.Image}>
				<NavLink to={`/articles/${props.id}`}>
					<img src={`${props.image}`} alt="news" />
				</NavLink>
				{props.editable ? (
					<EditMenu editClicked={props.editClicked} removeClicked={props.removeClicked} />
				) : null}
			</div>
			<div className={classes.Text}>
				<p className={classes.Date}>{props.date}</p>
				<Header h4 thin headerStyle={{ color: "#333333", lineHeight: "28px" }} mtb>
					{props.title}
				</Header>
				<span className={[ classes.Link, "accent" ].join(" ")}>Read more »</span>
			</div>
		</div>
	);
};

export default newsItem;
