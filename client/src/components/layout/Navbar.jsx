import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { redirectByRole } from '../../utils/redirectByRole';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);

  const getInitial = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    setOpenDropdown(false);
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-mark">TE</span>
          <span className="logo-text">TravelEase</span>
        </Link>

        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="navbar-right">
          {!user ? (
            <div className="auth-links">
              <Link to="/login" className="nav-btn nav-btn-light">
                Login
              </Link>
              <Link to="/register" className="nav-btn nav-btn-primary">
                Register
              </Link>
            </div>
          ) : (
            <div className="navbar-user-menu">
              <button
                type="button"
                className="user-menu-button"
                onClick={() => setOpenDropdown((current) => !current)}
              >
                <div className="user-avatar">{getInitial(user.name)}</div>

                <div className="user-meta">
                  <span className="welcome-text">Welcome back</span>
                  <span className="user-name">{user.name}</span>
                </div>

                <span className="dropdown-arrow">v</span>
              </button>

              {openDropdown && (
                <div className="dropdown-menu">
                  <Link
                    to={redirectByRole(user.role)}
                    className="dropdown-item"
                    onClick={() => setOpenDropdown(false)}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setOpenDropdown(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    to="/my-bookings"
                    className="dropdown-item"
                    onClick={() => setOpenDropdown(false)}
                  >
                    My Bookings
                  </Link>

                  <button type="button" className="dropdown-item logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
