import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core/";
import Copyright from "./copyright";
//import facebook from "../../assets/facebook.svg";
//import twitter from "../../assets/twitter.svg";
//import instagram from "../../assets/instagram.svg";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";
import instagram from "../../assets/instagram.png";
import youtube from "../../assets/youtube.png";

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
    //backgroundColor: theme.palette.primary.main,
    position: "relative",
    marginTop: "1em",
    borderRadius: "5em",
  },
  icon: {
    marginTop: "0.5em",
    marginLeft: "2em",
    marginRight: "2em",
    height: "3em",
    width: "3em",
    [theme.breakpoints.down("xs")]: {
      height: "1.5em",
      width: "1.5em",
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
            <Grid
              item
              component={"a"}
              href="https://www.youtube.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img alt="youtube logo" src={youtube} className={classes.icon} />
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
}
