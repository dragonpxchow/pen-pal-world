import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "./redux/store/createStore";
import { loadUser } from "./redux/actions/authActions";
import Navbar from "./components/layout/navbar";
import Home from "./components/pages/home";
import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";
import "./styles/app.css";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;

/*
// worked too usung class
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <>
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </>
    );
  }
}
*/
