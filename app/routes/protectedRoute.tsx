import { useEffect, type JSX } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasProfile = localStorage.getItem("hasProfile") === "true";
    if (!hasProfile && location.pathname !== "/") {
      navigate("/");
    }
  }, [navigate, location]);

  return children;
};

export default ProtectedRoute;
