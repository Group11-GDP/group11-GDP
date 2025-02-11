import type { Route } from "./+types/home";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Expense Tracker" },
    { name: "description", content: "Welcome to your Expense Tracker!" },
  ];
}

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isUsernameInvalid = username.trim() === "";
  const isEmailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordInvalid = password.trim() === "" || password.length < 6;
  const isConfirmPasswordInvalid = confirmPassword.trim() === "" || confirmPassword !== password;

  return (
    <div className="home-container">
      <h1 className="welcome-header">WELCOME TO YOUR EXPENSE TRACKER!</h1>

      <section className="basic-info">
        <div className="basic-header">
          <span>Basic Information</span>
          <span className="collapse-icon">▲</span>
        </div>

        <div className="input-group">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Username"
              className={isUsernameInvalid ? "error-input" : ""}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {isUsernameInvalid && <span className="error-icon">!</span>}
          </div>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email"
              className={isEmailInvalid ? "error-input" : ""}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isEmailInvalid && <span className="error-icon">!</span>}
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Password"
              className={isPasswordInvalid ? "error-input highlighted-input" : ""}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isPasswordInvalid && <span className="error-icon">!</span>}
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Confirm Password"
              className={isConfirmPasswordInvalid ? "error-input" : ""}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {isConfirmPasswordInvalid && <span className="error-icon">!</span>}
          </div>
        </div>
      </section>

      <div className="button-group">
        <button className="action-button">Add budget now</button>
        <button className="create-profile-button">Create Profile</button>
      </div>
    </div>
  );
}