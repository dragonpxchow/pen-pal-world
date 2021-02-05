import axios from "axios";
import jwt_decode from "jwt-decode";
import { tokenKey } from "./constants";

export const setAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in  x-auth-token
    //axios.defaults.headers.common['Authorization'] = token;
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    // Delete auth header
    //delete axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export const getCurrentUser = () => {
  try {
    // authenticated user with valid jwt
    const jwt = localStorage.getItem(tokenKey);
    return jwt_decode(jwt);
  } catch (ex) {
    // anonymous user
    return null;
  }
};

export const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

export const setJwt = (jwt) => {
  axios.defaults.headers.common["x-auth-token"] = jwt;
};
