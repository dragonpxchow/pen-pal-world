import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline"; // similar to normalize.css
import "fontsource-roboto";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
//import { ThemeProvider } from "@material-ui/styles";
import jwt_decode from "jwt-decode";
import theme from "./components/layout/theme";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Dashboard from "./components/dashboard/dashboard";
import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";
import SignOut from "./components/auth/signOut";
import { UserProfile } from "./components/pages/userProfile/userProfilePage";
import AboutUs from "./components/pages/aboutUs";
import PrivateRoute from "./components/private-route/privateRoute";
import store from "./redux/store/createStore";
import { setAuthToken } from "./common/utils";
import { tokenKey } from "./common/constants";
import { setCurrentUser, signOut } from "./redux/actions/authActions";
import Employees from "./components/pages/employee/employees";
//import "./styles/app.css";

// Check for token to keep user logged in
if (localStorage.getItem(tokenKey)) {
  // Set auth token header auth
  const token = localStorage.getItem(tokenKey);
  setAuthToken(token);
  // decode token and get user info and exp
  const decoded = jwt_decode(token);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(signOut());
    // redirect to login
    window.location.href = "./login";
  }
}

const withFooter = (WrappedComponent) => () => [
  <WrappedComponent key="1" />,
  <Footer key="2" />,
];

const Wrapper = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={SignIn} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/userprofile" component={UserProfile} />
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/logout" component={SignOut} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

const WrapperWithFooter = withFooter(Wrapper);

class App extends Component {
  render() {
    return <WrapperWithFooter />;
  }
}
export default App;
