import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { SIGNUP_FAIL } from "./../../redux/actions/actionTypes";
import { signUp } from "../../redux/actions/authActions";

const SignUp = ({ signUp, isAuthenticated, error, history }) => {
  // check the list of dependency values against the values from the last render,
  // and will call your effect function if any one of them has changed
  useEffect(() => {
    if (error.id === SIGNUP_FAIL) {
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
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  // update local state
  const handleOnChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.id]: e.target.value });
  };

  // this hook allows us to access the dispatch function
  // const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // attempt to register
    signUp(signUpData);
  };

  return (
    <div className="container">
      <form className="white" onSubmit={handleOnSubmit}>
        <h5 className="grey-text text-darken-3">Sign Up</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleOnChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleOnChange} />
        </div>
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" onChange={handleOnChange} />
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" onChange={handleOnChange} />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Sign Up</button>

          <div className="center red-text">
            <p>{authError}</p>
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
    signUp: (signUpData) => dispatch(signUp(signUpData)),
  };
};

//export default connect(mapStateToProps, null)(SignUp);  // working with use dispatch
export default connect(mapStateToProps, mapDispatchToProps)(SignUp); // working
//export default connect(mapStateToProps, { signUp })(SignUp);          // working

/*  // test for empty object {}
      <div className="center red-text">
            {Object.keys(authError.msg).length === 0 &&
            authError.msg.constructor === Object ? null : (
              <p>{authError.msg}</p>
            )}
        </div>
*/
