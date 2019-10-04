import React from "react";
import classes from "./Comments.module.css";
import LeaveComment from "./LeaveComment/LeaveComment";
import Comment from "./Comment/Comment";
import Paper from "../UI/Paper/Paper";
import Header from "../UI/Header/Header";
import Text from "../UI/Text/Text";
const comments = props => {
	const content = {
		noComments: [ "Пока нет комментариев", "No comments yet" ]
	};
	const comments = props.comments ? (
		props.comments.map(comment => {
			return (
				<Comment
					key={comment[0].id}
					profile={comment[1]}
					comment={comment[0]}
					commentClicked={event => props.commentClicked(event, comment[0].user_id)}
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
				{/* {console.log("comments: ", comments)} */}
				{comments.length ? comments : <Text mt>{content.noComments[props.lang]}</Text>}
			</Paper>
		</div>
	);
};

export default comments;
