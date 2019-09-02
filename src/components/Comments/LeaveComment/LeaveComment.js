import React from "react";
import classes from "./LeaveComment.module.css";
import Card from "../../UI/Card/Card";
import Header from "../../UI/Header/Header";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const leaveComment = props => {
  const lang = {
    title: ["Комментарии", "Comments"],
    button: ["Отправить", "Submit"]
  };
  const form = [];
  // eslint-disable-next-line
  for (let key in props.commentForm) {
    form.push({ key: key, elementConfig: props.commentForm[key] });
  }
  const commentsForm = form.map(commentForm => {
    return (
      <Input
        key={commentForm.key}
        elementConfig={commentForm.elementConfig}
        changed={event => props.commentChanged(event, commentForm.key)}
      ></Input>
    );
  });
  return (
    <Card comment color="#EDEDED">
      <Header h5>
        {lang.title[0]} <span className="accent">{props.commentsCount}</span>
      </Header>

      <form onSubmit={event => props.commentSubmitted(event)}>
        <div className={classes.Input}>{commentsForm}</div>
        <Button round accent>
          {lang.button[0]}
        </Button>
      </form>
    </Card>
  );
};

export default leaveComment;
