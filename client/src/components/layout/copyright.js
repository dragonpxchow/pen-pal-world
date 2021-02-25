import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
//import { CopyrightOutlined } from "@material-ui/icons";  // need UI facelift

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="textSecondary" to="/">
        Pen Pal World
      </Link>{" "}
      {new Date().getFullYear()}
      {".  All rights reserved"}
    </Typography>
  );
}
