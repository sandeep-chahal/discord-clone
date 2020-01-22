import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    if (isValid()) {
      props.login(email, password);
    }
  };

  const isValid = () => {
    const errors = [];
    if (!email.trim()) errors.push("email");
    if (password.trim().length < 6 || password.trim().length > 128)
      errors.push("password");
    setErrors(errors);
    return !errors;
  };

  let style = {};

  useEffect(() => {
    return () => {
      style = { transform: "translate(0,100px)" };
    };
  }, []);

  return (
    <div className="login" style={style}>
      <h2>Welcome back!</h2>
      <h3>We're so excited to see you again!</h3>
      <form onSubmit={handleSubmit}>
        <label
          for="email"
          style={{ color: errors.includes("email") ? "#d72323" : "white" }}
        >
          EMAIL
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            borderColor: errors.includes("email") ? "#d72323" : "rgb(51, 51, 51"
          }}
        />

        <label
          for="password"
          style={{ color: errors.includes("password") ? "#d72323" : "white" }}
        >
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          autoComplete="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            borderColor: errors.includes("password")
              ? "#d72323"
              : "rgb(51, 51, 51"
          }}
        />

        <button type="submit">Login</button>
      </form>
      <Link to="/register">Need an Account?</Link>
    </div>
  );
};

export default Login;
