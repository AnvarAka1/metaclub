import React from "react";
import classes from "./Footer.module.css";
import Grid from "../Grid/Grid";
import Social from "../Social/Social";
import Developers from "../Developers/Developers";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Hidden from "@material-ui/core/Hidden";
import Header from "../UI/Header/Header";
const footer = props => {
  let footerForm = [];
  // eslint-disable-next-line
  for (let key in props.footerForm) {
    footerForm.push({ key: key, elementConfig: props.footerForm[key] });
  }

  const form = footerForm.map(f => {
    return (
      <Grid item key={f.key} {...f.elementConfig.grid}>
        <Input
          changed={event => props.inputChanged(event, f.key)}
          elementConfig={f.elementConfig}
        ></Input>
      </Grid>
    );
  });
  const textLang = {
    header: ["Обратная связь", "Feedback"],
    button: ["Отправить", "Send"]
  };

  return (
    <footer className={classes.FooterWrapper}>
      <div className={classes.Footer}>
        <Grid container con="true">
          <Grid item xs={12}>
            <Header h3 thin headerStyle={{ marginBottom: "15px" }}>
              {textLang.header[props.lang]}
            </Header>
          </Grid>

          <Grid item sm={8}>
            <form onSubmit={props.submitted}>
              <Grid container spacing={2}>
                {form}
                <Hidden xsDown>
                  <Grid item md={9} sm={8}></Grid>
                </Hidden>
                <Grid item md={3} sm={4} xs={12}>
                  <Button wide flatten>
                    {textLang.button[props.lang]}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Hidden xsDown>
            <Grid item sm={1}></Grid>
          </Hidden>
          <Grid item sm={2} xs={12}>
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
