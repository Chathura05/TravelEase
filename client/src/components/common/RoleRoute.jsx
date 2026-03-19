import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { redirectByRole } from '../../utils/redirectByRole';

const RoleRoute = ({ allowedRoles = [] }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={redirectByRole(user.role)} replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
