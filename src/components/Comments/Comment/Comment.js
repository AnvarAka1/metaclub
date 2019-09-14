import React from "react";
import classes from "./Comment.module.css";
import ProfilePhoto from "../../ProfilePhoto/ProfilePhoto";
import Header from "../../UI/Header/Header";
import Text from "../../UI/Text/Text";

const comment = props => {
	return (
		<div className={classes.Comment}>
			<ProfilePhoto
				clicked={props.commentClicked}
				src={props.profile ? props.profile.photo : null}
				alt={props.profile ? props.profile.name : null}
			/>
			<div className={classes.Text}>
				<Header h5 clicked={props.commentClicked}>
					{props.profile ? props.profile.name : null}
				</Header>
				<Text small>{props.comment ? props.comment.body : null}</Text>
			</div>
		</div>
	);
};

export default comment;
