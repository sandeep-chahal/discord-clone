import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    if (isValid()) {
      props.register(email, password, username);
    }
  };

  const isValid = () => {
    const errors = [];
    if (!email.trim()) errors.push("email");
    if (password.trim().length < 6 || password.trim().length > 128)
      errors.push("password");
    if (username.trim().length < 3 || username.trim().length > 8)
      errors.push("username");
    setErrors(errors);
    return !errors;
  };

  return (
    <div className="register">
      <h2>Create an account</h2>
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
          for="username"
          style={{ color: errors.includes("username") ? "#d72323" : "white" }}
        >
          USERNAME
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{
            borderColor: errors.includes("username")
              ? "#d72323"
              : "rgb(51, 51, 51"
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

        <button type="submit">Continue</button>
      </form>
      <Link to="/login">Already have an account?</Link>
    </div>
  );
};

export default Register;
