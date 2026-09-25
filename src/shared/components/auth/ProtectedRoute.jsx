import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../../core/state/AuthContext";

export default function ProtectedRoute({allowedRoles = []}) {
    const {user, isAuthenticated, loading} = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    if(!isAuthenticated) {
        return<Navigate to="/login" replace />;
    }

    if (allowedRoles.length === 0) {
        return <Outlet/>;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet/>;
}