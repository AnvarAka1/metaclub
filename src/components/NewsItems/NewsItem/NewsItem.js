import React from "react";
import classes from "./NewsItem.module.css";
import { NavLink } from "react-router-dom";
import EditMenu from "../EditMenu/EditMenu";
import Header from "../../UI/Header/Header";
import EyeIcon from "../../../assets/images/icons/eye.png";
import ComIcon from "../../../assets/images/icons/comments.png";

const newsItem = props => {
	let content = {
		link: [ "Подробнее", "Read more" ],
		comments: [ "комментариев", "comments" ]
	};
	if (props.comments === 1) {
		content.comments[0] = "комментарий";
		content.comments[1] = "comment";
	}
	if (props.comments % 10 >= 2 && props.comments % 10 <= 4) {
		content.comments[0] = "комментария";
	}
	if (props.comments >= 5 && props.comments <= 20) {
		content.comments[0] = "комментариев";
	}
	return (
		<div className={classes.NewsItem} onClick={props.clicked && props.clicked}>
			<div className={classes.Image}>
				<NavLink to={`/articles/${props.id}`}>
					<img src={`${props.image}`} alt={props.title} />
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
					<div className={classes.Date}>
						<img className={classes.Eye} src={ComIcon} alt={"Comments"} />
						{props.comments}
						<div className={classes.CommentWord}>
							<Header mlr h6 normal color="#777777">
								{content.comments[props.lang]}
							</Header>
						</div>
					</div>
				</div>
				<NavLink to={`/articles/${props.id}`}>
					<Header h4 overflow thin headerStyle={{ color: "#333333", lineHeight: "28px" }} mtb>
						{props.title}
					</Header>
					<span className={[ classes.Link, "accent" ].join(" ")}>{content.link[props.lang]} »</span>
				</NavLink>
			</div>
		</div>
	);
};

export default newsItem;
