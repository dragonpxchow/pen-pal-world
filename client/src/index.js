import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

console.log("Application client environment is:", process.env.NODE_ENV);
console.log("REACT_APP_API_URL >>>>", process.env.REACT_APP_API_URL);

ReactDOM.render(<App />, document.getElementById("root"));

/*
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
*/
