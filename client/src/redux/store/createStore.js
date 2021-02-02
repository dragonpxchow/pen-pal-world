import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers/combinedReducers";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"; //logOnlyInProduction

// create store from all reducers combined together
const middlewares = [thunk];
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
