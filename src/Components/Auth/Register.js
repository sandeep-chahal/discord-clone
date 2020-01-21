import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.style.scss";

const Register = props => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  handleSubmit = () => {};

  return (
    <div className="register">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <label for="email">EMAIL</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label for="username">USERNAME</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label for="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          autoComplete="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Continue</button>
      </form>
      <Link to="/login">Already have an account?</Link>
    </div>
  );
};

export default Register;
