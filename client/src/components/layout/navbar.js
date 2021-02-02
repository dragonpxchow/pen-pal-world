import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignedInLinks from "./signedInLinks";
import SignedOutLinks from "./signedOutLinks";

const Navbar = () => {
  // here we declare what we want to take from the redux store with the useSelector() hook
  // every time one of these properties is updated on the store, our component will re-render to reflect it
  const auth = useSelector((state) => state.auth);
  //console.log("navbar auth >>>>>", auth);
  /*
  const error = useSelector((state) => state.error);
  console.log("navbar auth error >>>>>", error); 
  */
  // show menu links depending on user's login status
  const links = auth.isAuthenticated ? <SignedInLinks /> : <SignedOutLinks />;

  return (
    <nav className="nav-wrapper blue darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          Project Tracker
        </Link>
        {links}
      </div>
    </nav>
  );
};

export default Navbar;
