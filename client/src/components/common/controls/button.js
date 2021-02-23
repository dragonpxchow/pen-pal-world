import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button as MuiButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1), // will add more styles
  },
  label: {
    textTransform: "none",
  },
}));

export default function Button(props) {
  const { text, size, color, variant, onClick, ...others } = props;
  const classes = useStyles();
  return (
    <MuiButton
      size={size || "large"}
      color={color || "primary"}
      variant={variant || "contained"}
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      {...others}
      onClick={onClick}
    >
      {text}
    </MuiButton>
  );
}
