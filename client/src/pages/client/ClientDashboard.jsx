import { Link } from 'react-router-dom';

const ClientDashboard = () => {
  return (
    <div className="dashboard-panel">
      <p className="section-kicker">Client dashboard</p>
      <h1>Your next trip starts here.</h1>
      <p>
        Browse packages, create bookings, and keep travel details updated from one workspace.
      </p>
      <div className="quick-links">
        <Link to="/packages" className="primary-button">
          Browse packages
        </Link>
        <Link to="/my-bookings" className="ghost-button">
          Manage bookings
        </Link>
      </div>
    </div>
  );
};

export default ClientDashboard;
