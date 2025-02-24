import { Outlet, Link } from "react-router-dom";
import ProtectedRoute from "./protectedRoute"; 
import ExpenseIcon from "~/icons/ExpenseIcon";
import HomeIcon from "~/icons/HomeIcon";
import ProfileIcon from "~/icons/ProfileIcon";
import ReturnIcon from "~/icons/ReturnIcon";
import LogIcon from "~/icons/LogIcon";
import NavBar from "../components/navigationBar/navBar"; 

export default function Layout() {
  return (
    <div className="layout-container">
      <div className="scroll-container">
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      </div>
      <NavBar />
    </div>
  );
}
