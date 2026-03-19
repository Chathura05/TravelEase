import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-panel">
      <p className="section-kicker">Profile</p>
      <h1>{user?.name}</h1>
      <div className="details-stats">
        <div>
          <span>Email</span>
          <strong>{user?.email}</strong>
        </div>
        <div>
          <span>Phone</span>
          <strong>{user?.phone || 'Not added yet'}</strong>
        </div>
        <div>
          <span>Role</span>
          <strong>{user?.role?.replaceAll('_', ' ')}</strong>
        </div>
      </div>
    </div>
  );
};

export default Profile;
