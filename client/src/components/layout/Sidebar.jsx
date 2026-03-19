import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../constants/roles';

const linksByRole = {
  [ROLES.REGISTERED_CLIENT]: [
    { to: '/dashboard', label: 'Overview' },
    { to: '/my-bookings', label: 'My Bookings' },
    { to: '/profile', label: 'Profile' },
  ],
  [ROLES.ADMIN]: [
    { to: '/admin', label: 'Admin Dashboard' },
    { to: '/packages', label: 'Packages' },
    { to: '/my-bookings', label: 'Bookings' },
  ],
  [ROLES.MARKETING_MANAGER]: [
    { to: '/marketing', label: 'Marketing Dashboard' },
    { to: '/packages', label: 'Campaign Packages' },
  ],
  [ROLES.FINANCE_MANAGER]: [
    { to: '/finance', label: 'Finance Dashboard' },
    { to: '/my-bookings', label: 'Booking Ledger' },
  ],
  [ROLES.SUPPORT_AGENT]: [
    { to: '/support', label: 'Support Dashboard' },
    { to: '/my-bookings', label: 'Customer Bookings' },
  ],
};

const Sidebar = () => {
  const { user } = useAuth();
  const links = linksByRole[user?.role] || [];

  return (
    <aside className="dashboard-sidebar">
      <p className="sidebar-label">Workspace</p>
      <h2>{user?.name || 'Guest'}</h2>
      <p className="sidebar-role">{user?.role?.replaceAll('_', ' ')}</p>

      <nav className="sidebar-nav">
        {links.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
