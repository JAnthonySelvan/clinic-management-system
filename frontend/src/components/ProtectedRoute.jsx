import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

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

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
