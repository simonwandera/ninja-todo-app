
import { useLocation, Navigate, Outlet } from "react-router-dom";


const RequireAuth = ({ userType }) => {
    const location = useLocation();

    return (
        userType && userType === 'ADMIN'
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;