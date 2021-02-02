import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { signUp } from "../../redux/actions/authActions";

const SignUp = (props) => {
  // use effect
  useEffect(() => {
    console.log("useEffcet fire .................");
  }, []);

  // the useState() hook allows our component to hold its own internal state
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  // here we declare what we want to take from the redux store with the useSelector() hook
  // every time one of these properties is updated on the store, our component will re-render to reflect it
  const auth = useSelector((state) => state.auth);
  let error = useSelector((state) => state.error);
  let [authError, setAuthError] = useState(() => {
    return _.isEmpty(error.msg) ? null : error.msg.message;
  });

  //authError = _.isEmpty(error.msg) ? null : error.msg.message; // error.msg default is empty object {}
  // setAuthError(gotError);
  //console.log("signUp auth >>>>>", auth);
  console.log("signUp auth error >>>>>", authError);

  // this hook allows us to access the dispatch function
  const dispatch = useDispatch();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(signUp(signUpData));
    setAuthError("this is an error" + error.msg);
  });
  /*
  const handleSubmit = (e) => {
    e.preventDefault();

    //authError = "I got error";
    // attempt to register
    console.log("Attemp to sign in .... 1", props);

    dispatch(signUp(signUpData));

    setAuthError("this is an error" + error.msg);

    // back to home page
    //history.push("/");
    //console.log("Signin >>>>>", this.state);
  };
*/
  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.id]: e.target.value });
  };

  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Sign Up</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" onChange={handleChange} />
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

export default SignUp;

/*  // test for empty object {}
      <div className="center red-text">
            {Object.keys(authError.msg).length === 0 &&
            authError.msg.constructor === Object ? null : (
              <p>{authError.msg}</p>
            )}
        </div>
*/
