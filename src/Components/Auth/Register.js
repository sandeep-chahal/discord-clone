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
		} else {
		}
	};

	const isValid = () => {
		const emailRegex = /[a-zA-Z0-9]{4,}@[a-zA-Z0-9]{3,}\.[a-zA-Z]{1,10}/gi;
		const passwordRegex = /[a-zA-Z0-9*%#@!]{6,32}/gi;
		const userNameRegex = /^[a-z0-9_-]{3,16}$/gi;
		const errors = [];
		if (!emailRegex.exec(email)) errors.push("email");
		if (!passwordRegex.exec(password)) errors.push("password");
		if (!userNameRegex.exec(username)) errors.push("username");
		setErrors(errors);
		return errors.length === 0;
	};

	return (
		<div className="register">
			<h2>Create an account</h2>
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
					style={{ color: errors.includes("username") ? "#d72323" : "white" }}
				>
					USERNAME
				</label>
				<input
					type="text"
					value={username}
					onChange={e => setUsername(e.target.value)}
					style={{
						borderColor: errors.includes("username")
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

				<button type="submit">Continue</button>
			</form>
			{props.error ? <div className="error">{props.error.message}</div> : ""}
			<Link to="/login">Already have an account?</Link>
		</div>
	);
};

export default Register;
