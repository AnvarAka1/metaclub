import React from "react";
import classes from "./Comments.module.css";
import LeaveComment from "./LeaveComment/LeaveComment";
import Comment from "./Comment/Comment";
import Paper from "../UI/Paper/Paper";
const comments = props => {
  const comments = props.comments.map(comment => {
    return (
      <Comment
        key={comment.id}
        profile={comment.profile}
        commentClicked={event => props.commentClicked(event, comment.id)}
      ></Comment>
    );
  });
  const commentsCount = props.comments.length;
  return (
    <div className={classes.Comments}>
      <LeaveComment
        commentsCount={commentsCount}
        commentForm={props.commentForm}
        commentSubmitted={props.commentSubmitted}
        commentChanged={props.commentChanged}
      ></LeaveComment>
      <Paper blank comment>
        {comments}
      </Paper>
    </div>
  );
};

export default comments;
