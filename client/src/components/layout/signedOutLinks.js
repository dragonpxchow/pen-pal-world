import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearErrors } from "./../../redux/actions/errorAction";

const SignedOutLinks = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <ul className="right">
        <li>
          <NavLink onClick={() => dispatch(clearErrors())} to="/signup">
            Signup
          </NavLink>
        </li>
        <li>
          <NavLink onClick={() => dispatch(clearErrors())} to="/signin">
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SignedOutLinks;
