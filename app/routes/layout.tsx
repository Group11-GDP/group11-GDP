import { Outlet, Link } from "react-router-dom";
import ProtectedRoute from "../routes/protectedRoute"; 
import ExpenseIcon from "~/icons/ExpenseIcon";
import HomeIcon from "~/icons/HomeIcon";
import ProfileIcon from "~/icons/ProfileIcon";
import ReturnIcon from "~/icons/ReturnIcon";
import LogIcon from "~/icons/LogIcon";

export default function Layout() {
  return (
    <>
      <header>
        <Link to="/">
          <ReturnIcon />
        </Link>
      </header>

      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>

      <nav>
        <Link to="/home">
          <HomeIcon />
        </Link>
        <Link to="/expense">
          <ExpenseIcon />
        </Link>
        <Link to="/income">
          <LogIcon />
        </Link>
        <Link to="/">
          <ProfileIcon />
        </Link>
      </nav>
    </>
  );
}