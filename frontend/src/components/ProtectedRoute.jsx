import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const LOGIN_PATHS = {
  admin: "/admin/login",
  doctor: "/doctor/login",
};

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user, loading } = useAppSelector(
    (state) => state.auth,
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const loginPath = LOGIN_PATHS[role] || "/admin/login";

  if (!isAuthenticated) {
    return <Navigate to={loginPath} replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
