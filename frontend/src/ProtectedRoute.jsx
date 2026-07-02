import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children, guestOnly = false }) => {
    if (guestOnly && user) {
        return <Navigate to="/dashboard" replace />;
    }

    if (!guestOnly && !user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;