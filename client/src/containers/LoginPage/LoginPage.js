import React, { useState } from "react";

export default function LoginPage() {
	const [username, setUsername] = useState("user1");
	const [password, setPassword] = useState("123456");
	const [message, setMessage] = useState("");

	const loginHandler = async (event) => {
		event.preventDefault();

		const user = { username, password };
		console.log(user);

		fetch("http://localhost:5000/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((response) => response.json())
			.then((responseData) => {
				console.log(responseData);
				setMessage("Login Success");
			})
			.catch((e) => setMessage("Login Failed"));
	};

	return (
		<>
			{message.length > 0 ? <p>{message}</p> : null}
			<form onSubmit={loginHandler}>
				<input
					value={username}
					onChange={(event) => setUsername(event.target.value)}
					placeholder="username"
				/>
				<input
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					placeholder="password"
				/>
				<button>Login</button>
			</form>
		</>
	);
}
