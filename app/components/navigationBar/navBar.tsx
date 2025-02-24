import { Link, useLocation } from "react-router-dom";
import HomeIcon from "~/icons/HomeIcon";
import ExpenseIcon from "~/icons/ExpenseIcon";
import ProfileIcon from "~/icons/ProfileIcon";
import LogIcon from "~/icons/LogIcon";
import SettingsIcon from "~/icons/SettingsIcon"
import "./navBar.css";

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <Link to="/home" className={location.pathname === "/home" ? "active" : ""}>
        <HomeIcon />
        <span>Home</span>
      </Link>
      <Link to="/expense" className={location.pathname === "/expense" ? "active" : ""}>
        <ExpenseIcon />
        <span>Expenses</span>
      </Link>
      <Link to="/income" className={location.pathname === "/income" ? "active" : ""}>
        <LogIcon />
        <span>Income</span>
      </Link>
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        <SettingsIcon />
        <span>Setting</span>
      </Link>
    </nav>
  );
}
