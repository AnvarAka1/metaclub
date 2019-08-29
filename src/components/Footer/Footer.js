import React from "react";
import classes from "./Footer.module.css";
import Grid from "../Grid/Grid";
import Social from "../Social/Social";
import Developers from "../Developers/Developers";
const footer = props => {
    
  return (
    <footer>
      <div className={classes.Footer}>
        <Grid con container>
          <Grid item xs={12}>
            <h3>Обратная связь</h3>
          </Grid>
          <Grid item sm={8}>
            something
          </Grid>
          <Grid item sm={1}></Grid>
          <Grid item sm={2}>
            <Social></Social>
          </Grid>
          <Grid item xs={12}>
            <Developers></Developers>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
};

export default footer;
