import React from "react";
import classes from "./Grid.module.css";
import Grid from "@material-ui/core/Grid";

const grid = props => {
  return (
    <div className={classes.Grid}>
      <Grid {...props}>{props.children}</Grid>
    </div>
  );
};
export default grid;
