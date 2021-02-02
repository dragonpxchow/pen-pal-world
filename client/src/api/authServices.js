import jwtDecode from "jwt-decode";
import http from "./httpServices";
//import { apiUrl } from "../config.json";  use environment variable

const apiEndPoint = "/auth"; //apiUrl + "/auth";
const tokenKey = "token";

// same with axios.defaults.headers.common["x-auth-token"] = jwt;
http.setJwt(getJwt()); // fixing bi-directional dependencies

/*
export async function getUser() {
  const { data } = await http.get("/users/me");
  console.log("authServices >>>>>>", data);
  return data;
}
*/

export async function login(email, password) {
  // no longer in use !!!
  // expect token + user data
  const { data } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, data.token); // localStorage available to all browser
  return data;
}

export function loginWithJwt(jwt) {
  // for Registration Form
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  // remove token key
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    // authenticared user with valid jwt
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    // anonymous user
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

// export as object
const obj = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};

export default obj;
