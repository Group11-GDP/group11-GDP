import { Outlet, useLocation } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import NavBar from "../components/navigationBar/navBar";

export default function Layout() {
  const location = useLocation(); 

  const isCreateAccountPage = location.pathname === "/";

  return (
    <div className="layout-container">
      <div className="scroll-container">
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      </div>
      {!isCreateAccountPage && <NavBar />}
    </div>
  );
}