import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [password, setPassword] = useState("");
  const[confirmPassowrd, setConfirmPassword] = useState("");

  return (
    <main>
      <h1 className="welcome-header">Welcome to your Expense Tracker!</h1>
      <form className="account-form">
        <input type = "text" placeholder="Enter username" />
        <input type = "email" placeholder="Enter e-mail" />
        <input type = "password" placeholder="Enter password" onChange={(evt) => setPassword(evt.currentTarget.value)}/>
        <input type = "password" placeholder="Confirm password" />

        <button type="submit">Add budget now</button>
        <button type="submit"> Create account </button>
      </form>
    </main>
  )
}
