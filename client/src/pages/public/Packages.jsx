import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await api.get('/packages');
        setPackages(data);
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || 'Unable to load packages right now.');
      }
    };

    fetchPackages();
  }, []);

  return (
    <section className="shell page-section">
      <div className="page-heading">
        <p className="section-kicker">Packages</p>
        <h1>Plan around destination, pace, and budget.</h1>
      </div>

      {error && <p className="status-banner error">{error}</p>}

      <div className="card-grid">
        {packages.map((item) => (
          <article key={item._id} className="package-card">
            <div className="package-card__media">
              <span>{item.category}</span>
              <strong>{item.featured ? 'Featured' : 'Open'}</strong>
            </div>
            <div className="package-card__body">
              <h3>{item.title}</h3>
              <p>{item.destination}</p>
              <p>{item.description}</p>
              <div className="package-meta">
                <span>{item.duration}</span>
                <span>{item.availableSlots} slots</span>
                <strong>${item.price}</strong>
              </div>
              <Link to={`/packages/${item._id}`} className="primary-button">
                View details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Packages;
