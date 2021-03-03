import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "fontsource-roboto";
import CssBaseline from "@material-ui/core/CssBaseline"; // similar to normalize.css
import { Container } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
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

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Router>
            <Container>
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
              <Footer />
            </Container>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
export default App;
