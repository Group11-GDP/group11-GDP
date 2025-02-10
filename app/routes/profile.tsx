import type { Route } from "./+types/home";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Expense Tracker" },
    { name: "description", content: "Welcome to your Expense Tracker!" },
  ];
}

export default function Profile() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
            <input type="text" placeholder="Username" className="error-input" />
            <span className="error-icon">!</span>
          </div>
          <div className="input-wrapper">
            <input type="email" placeholder="Email" className="error-input" />
            <span className="error-icon">!</span>
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="error-input highlighted-input"
              onChange={(evt) => setPassword(evt.currentTarget.value)}
            />
            <span className="error-icon">!</span>
          </div>
          <div className="input-wrapper">
            <input type="password" placeholder="Confirm Password" className="error-input" />
            <span className="error-icon">!</span>
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