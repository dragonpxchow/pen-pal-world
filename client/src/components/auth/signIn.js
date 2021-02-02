import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SIGNIN_FAIL } from "./../../redux/actions/actionTypes";
import { signIn } from "../../redux/actions/authActions";

const SignIn = ({ signIn, isAuthenticated, error, history }) => {
  // check the list of dependency values against the values from the last render,
  // and will call your effect function if any one of them has changed
  useEffect(() => {
    /*
    console.log(
      "Signup fire useEffect .................isAuthenticated .............",
      isAuthenticated
    );
*/
    if (error.id === SIGNIN_FAIL) {
      setAuthError(error.message.error);
    } else {
      setAuthError(null);
    }

    if (isAuthenticated) {
      // back to home page after registered as user successfully
      history.push("/");
    }
  }, [error, isAuthenticated, history]);

  // the useState() hook allows our component to hold its own internal state
  const [authError, setAuthError] = useState(null);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setSignInData({ ...signInData, [e.target.id]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // attempt to register
    signIn(signInData);
  };

  return (
    <div className="container">
      <form className="white" onSubmit={handleOnSubmit}>
        <h5 className="grey-text text-darken-3">Sign In</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleOnChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleOnChange} />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Login</button>
          <div className="center red-text">
            {authError ? <p>{authError}</p> : null}
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

// map action creator to props
const mapDispatchToProps = (dispatch) => {
  return {
    // create props called "createProject" which dispatch action created called "createProject"
    signIn: (signInData) => dispatch(signIn(signInData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
