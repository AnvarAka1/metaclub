import React from "react";
import classes from "./NewsItem.module.css";
import { NavLink } from "react-router-dom";
import EditMenu from "../EditMenu/EditMenu";
import Header from "../../UI/Header/Header";
import EyeIcon from "../../../assets/images/icons/eye.png";
const newsItem = props => {
	const content = {
		link: [ "Подробнее", "Read more" ]
	};
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
				<div className={classes.Horizontal}>
					<p className={classes.Date}>{new Date(props.created_at).toLocaleDateString()}</p>
					<p className={classes.Date}>
						<img className={classes.Eye} src={EyeIcon} alt={"Views"} />
						{props.views}
					</p>
				</div>
				<NavLink to={`/articles/${props.id}`}>
					<Header h4 thin headerStyle={{ color: "#333333", lineHeight: "28px" }} mtb>
						{props.title}
					</Header>
					<span className={[ classes.Link, "accent" ].join(" ")}>{content.link[props.lang]} »</span>
				</NavLink>
			</div>
		</div>
	);
};

export default newsItem;
