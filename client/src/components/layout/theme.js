import { createMuiTheme } from "@material-ui/core/styles";

const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60";
const arcGrey = "#868686";

const defaultTheme = createMuiTheme(); //use this to get breakpoints

export default createMuiTheme({
  //spacing: 4,
  palette: {
    common: {
      blue: arcBlue,
      orange: arcOrange,
      grey: arcGrey,
    },
    primary: {
      main: arcBlue,
    },
    secondary: {
      main: arcOrange,
    },
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    //fontSize: 12,
    /*
    button: {
      fontSize: "0.5rem",
      fontStyle: 'italic',
    },
    */
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      color: "white",
      fontSize: "1rem",
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white",
    },
    h2: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "2.5rem",
      color: arcBlue,
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: "Pacifico",
      fontSize: "2.5rem",
      color: arcBlue,
    },
    h4: {
      fontFamily: "Raleway",
      fontSize: "1.75rem",
      color: arcBlue,
      fontWeight: 700,
    },
    h6: {
      fontWeight: 500,
      fontFamily: "Raleway",
      color: arcBlue,
    },
    subtitle1: {
      fontSize: "1.25rem",
      fontWeight: 300,
      color: arcGrey,
    },
    subtitle2: {
      fontSize: "1.25rem",
      fontWeight: 300,
      color: "red",
    },
    body1: {
      fontSize: "1.25rem",
      color: arcGrey,
      fontWeight: 300,
    },
    caption: {
      fontSize: "1rem",
      fontWeight: 300,
      color: arcGrey,
    },
    learnButton: {
      borderColor: arcBlue,
      borderWidth: 2,
      textTransform: "none",
      color: arcBlue,
      borderRadius: 50,
      fontFamily: "Roboto",
      fontWeight: "bold",
    },
  },
  mainContainer: {
    marginTop: "5em",
    paddingLeft: "1em",
    paddingRight: "1em",
    [defaultTheme.breakpoints.down("md")]: {
      marginTop: "3em",
    },
    [defaultTheme.breakpoints.down("xs")]: {
      marginTop: "2em",
    },
  },
  overrides: {
    // style sheet name ⚛
    /*
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        color: "red",
      },
    },
    */
    MuiInputLabel: {
      root: {
        color: arcBlue,
        fontSize: "1rem",
      },
    },
    MuiInput: {
      root: {
        color: arcGrey,
        fontWeight: 300,
        margin: 5,
        /*
         margin: 5,
        borderRadius: 0,
        backgroundColor: "#fff",
        border: "1px solid pink",
        fontSize: 16,
        padding: "10px 12px",
        width: "calc(100% - 24px)",
        */
      },

      underline: {
        "&:before": {
          borderBottom: `2px solid ${arcBlue}`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid ${arcBlue}`,
        },
      },
    },
  },
});
