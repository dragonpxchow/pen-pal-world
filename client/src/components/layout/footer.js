import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core/";
import Copyright from "./copyright";
import facebook from "../../assets/facebook.svg";
import twitter from "../../assets/twitter.svg";
import instagram from "../../assets/instagram.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    marginTop: theme.spacing(5),
  },
  footer: {
    padding: theme.spacing(2, 2),
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  socialContainer: {
    backgroundColor: theme.palette.primary.main,
    position: "relative",
    marginTop: "1em",
    borderRadius: "5em",
  },
  icon: {
    marginTop: "0.5em",
    marginLeft: "2em",
    height: "2em",
    width: "2em",
    [theme.breakpoints.down("xs")]: {
      height: "1.25em",
      width: "1.25em",
    },
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container component="main" className={classes.main} maxWidth="sm">
          <Copyright />
          <Grid
            container
            direction="row"
            justify="center"
            //alignContent="space-between"
            spacing={2}
            className={classes.socialContainer}
          >
            <Grid
              item
              component={"a"}
              href="https://www.facebook.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt="facebook logo"
                src={facebook}
                className={classes.icon}
              />
            </Grid>
            <Grid
              item
              component={"a"}
              href="https://www.twitter.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img alt="twitter logo" src={twitter} className={classes.icon} />
            </Grid>
            <Grid
              item
              component={"a"}
              href="https://www.instagram.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt="instagram logo"
                src={instagram}
                className={classes.icon}
              />
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
}
