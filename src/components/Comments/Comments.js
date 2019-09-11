import React from "react";
import classes from "./Comments.module.css";
import LeaveComment from "./LeaveComment/LeaveComment";
import Comment from "./Comment/Comment";
import Paper from "../UI/Paper/Paper";
import Header from "../UI/Header/Header";
import Text from "../UI/Text/Text";
const comments = props => {
	const comments = props.comments ? (
		props.comments.map(comment => {
			return (
				<Comment
					key={comment.id}
					profile={comment.profile}
					commentClicked={event => props.commentClicked(event, comment.id)}
				/>
			);
		})
	) : (
		<Text mt>No comments yet</Text>
	);
	const commentsCount = props.comments ? props.comments.length : 0;
	const leaveComment = props.isAuthorized ? (
		<LeaveComment
			commentsCount={commentsCount}
			commentForm={props.commentForm}
			commentSubmitted={props.commentSubmitted}
			commentChanged={props.commentChanged}
		/>
	) : (
		<Header h5>Sign In to leave a comment</Header>
	);
	return (
		<div className={classes.Comments}>
			{leaveComment}
			<Paper blank comment>
				{comments}
			</Paper>
		</div>
	);
};

export default comments;
