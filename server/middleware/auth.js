import jwt from "jsonwebtoken";
//import config from "config";
//import json from "json-loader";
//import { default as config } from "json-loader! ../config/default";

export default (req, res, next) => {
  // better forget this
  //if (!config.get("requiresAuth")) return next();   // es6/module could not read json file issue
  //if (!process.env.REACT_APP_REQUIRES_AUTH === false) return next();

  let token = req.header("x-auth-token");

  /*
  console.log(
    "authMiddleware User token >>>>>>>>>>>>>>>>>>>>", 
    ">>>>" + token + "<<<"
  );
  */

  //  null or undefined is string from header
  if (!token || token === "null" || token === "undefined") {
    return res.status(401).json({
      name: "JsonWebTokenError",
      error: "No authenticaiton token, Authorisation denied",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN_KEY); //config.get("jwtPrivateKey"));
    if (!verified) {
      res.status(401).json({
        name: "JsonWebTokenError",
        error: "Token verification failed, Authorisation denied",
      });
    }

    // return user data
    req.user = verified;
    next();
  } catch (error) {
    // {name: "JsonWebTokenError", message: "jwt malformed"}
    res.status(500).json({ name: error.name, error: error.message });
  }
};
