import "../styles/createAccount.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function meta({}: any) {
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
  const navigate = useNavigate();

  const isUsernameInvalid = username.trim() === "";
  const isEmailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordInvalid = password.trim() === "" || password.length < 6;
  const isConfirmPasswordInvalid = confirmPassword.trim() === "" || confirmPassword !== password;

  const handleCreateProfile = () => {
    if (isUsernameInvalid || isEmailInvalid || isPasswordInvalid || isConfirmPasswordInvalid) {
      alert("Please fill in all fields correctly.");
      return;
    }

    localStorage.setItem("hasProfile", "true");

    navigate("/home");
  };

  return (
    <div className="profile-container">
      <h1 className="profile-header">WELCOME TO YOUR EXPENSE TRACKER!</h1>

      <section className="profile-info">
        <div className="profile-header-bar">
          <span>Basic Information</span>
        </div>

        <div className="profile-input-group">
          <div className="profile-input-wrapper">
            <input
              type="text"
              placeholder="Username"
              className={`profile-input-field ${isUsernameInvalid ? "profile-error-input" : ""}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {isUsernameInvalid && <span className="profile-error-icon">!</span>}
          </div>
          <div className="profile-input-wrapper">
            <input
              type="email"
              placeholder="Email"
              className={`profile-input-field ${isEmailInvalid ? "profile-error-input" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isEmailInvalid && <span className="profile-error-icon">!</span>}
          </div>
          <div className="profile-input-wrapper">
            <input
              type="password"
              placeholder="Password"
              className={`profile-input-field ${isPasswordInvalid ? "profile-error-input" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isPasswordInvalid && <span className="profile-error-icon">!</span>}
          </div>
          <div className="profile-input-wrapper">
            <input
              type="password"
              placeholder="Confirm Password"
              className={`profile-input-field ${isConfirmPasswordInvalid ? "profile-error-input" : ""}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {isConfirmPasswordInvalid && <span className="profile-error-icon">!</span>}
          </div>
        </div>
      </section>

      <div className="profile-button-group">
        <button className="profile-action-button">Add budget now</button>
        <button className="profile-create-button" onClick={handleCreateProfile}>
          Create Profile
        </button>
      </div>
    </div>
  );
}
