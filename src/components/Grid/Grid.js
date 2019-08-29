import React from "react";
import classes from "./Grid.module.css";
import Grid from "@material-ui/core/Grid";

const grid = props => {
  return (
    <Grid
      {...props}
      className={[classes.Grid, props.con ? classes.Container : null].join(" ")}
    >
      {props.children}
    </Grid>
  );
};
export default grid;
