import axios from "axios";
import { toast } from "react-toastify";
// import auth from "./authService";  fixing bi-directioanl dependencies
import logger from "./logServices";

// based api url from .env (development or production)   eg. REACT_APP_API_URL=http://localhost:5000/api
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

//axios.defaults.headers.common["x-auth-token"] = auth.getJwt();
//axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"; //"https://gentle-beach-57815.herokuapp.com";
//axios.defaults.headers.common["Access-Control-Allow-Methods"] ="GET, POST, PUT, DELETE,OPTIONS";
//axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept";
//axios.interceptors.response.use(success, error);  // log success response
axios.interceptors.response.use(null, (error) => {
  // handle unexpected error globally
  // Expected - (404: Not found, 400: Bad request) - CLIENTS ERROR
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!expectedError) {
    // Unexpected - (network down, server down, db down, bug)
    //console.log("Logging the error", error);
    //alert("An unexpected error occured");
    logger.log(error);
    //toast.error("An unexpected error occured"); // use as object
    toast("An unexpected error occured"); // use as function
  }

  return Promise.reject(error);
});

// export as object
const obj = {
  get: axios.get, // get data
  post: axios.post, // create data
  put: axios.put, // update data
  delete: axios.delete, // delete data
};

export default obj;
