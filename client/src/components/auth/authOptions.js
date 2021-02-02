import React from "react";
import { useHistory } from "react-router-dom";

export default function AuthOptions() {
  const history = useHistory();
  const register = () => {
    history.push("/register");
  };
  const login = () => {
    history.push("./login");
  };

  return (
    <nav className="auth-options">
      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>
    </nav>
  );
}
