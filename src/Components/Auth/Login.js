import React, { useState } from "react";
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
    return errors.length === 0;
  };

  return (
    <div className="login">
      <h2>Welcome back!</h2>
      <h3>We're so excited to see you again!</h3>
      <form onSubmit={handleSubmit}>
        <label
          style={{ color: errors.includes("email") ? "#d72323" : "white" }}
        >
          EMAIL
        </label>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            borderColor: errors.includes("email")
              ? "#d72323"
              : "rgba(0,0,0,0.2)"
          }}
        />

        <label
          style={{ color: errors.includes("password") ? "#d72323" : "white" }}
        >
          PASSWORD
        </label>
        <input
          type="password"
          autoComplete="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            borderColor: errors.includes("password")
              ? "#d72323"
              : "rgba(0,0,0,0.2)"
          }}
        />

        <button type="submit">Login</button>
      </form>
      {props.error ? <div className="error">{props.error.message}</div> : ""}
      <Link to="/register">Need an Account?</Link>
    </div>
  );
};

export default Login;
