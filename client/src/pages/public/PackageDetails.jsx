import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const initialForm = {
  travelersCount: 1,
  travelDate: '',
};

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [travelPackage, setTravelPackage] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const { data } = await api.get(`/packages/${id}`);
        setTravelPackage(data);
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || 'Package not found.');
      }
    };

    fetchPackage();
  }, [id]);

  const submitBooking = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await api.post('/bookings', {
        packageId: id,
        travelersCount: Number(form.travelersCount),
        travelDate: form.travelDate,
      });
      setSuccess('Booking created. You can manage it from My Bookings.');
      setForm(initialForm);
    } catch (submitError) {
      setError(submitError.response?.data?.message || 'Booking could not be created.');
    }
  };

  if (error && !travelPackage) {
    return (
      <section className="shell page-section">
        <p className="status-banner error">{error}</p>
      </section>
    );
  }

  if (!travelPackage) {
    return (
      <section className="shell page-section">
        <p className="status-banner">Loading package details...</p>
      </section>
    );
  }

  return (
    <section className="shell page-section details-grid">
      <article className="details-card">
        <p className="section-kicker">{travelPackage.category}</p>
        <h1>{travelPackage.title}</h1>
        <p className="details-lead">{travelPackage.description}</p>
        <div className="details-stats">
          <div>
            <span>Destination</span>
            <strong>{travelPackage.destination}</strong>
          </div>
          <div>
            <span>Duration</span>
            <strong>{travelPackage.duration}</strong>
          </div>
          <div>
            <span>Price</span>
            <strong>${travelPackage.price}</strong>
          </div>
          <div>
            <span>Slots</span>
            <strong>{travelPackage.availableSlots}</strong>
          </div>
        </div>

        <div className="itinerary-list">
          <h2>Itinerary</h2>
          {travelPackage.itinerary?.length ? (
            travelPackage.itinerary.map((stop, index) => <p key={`${stop}-${index}`}>{stop}</p>)
          ) : (
            <p>Detailed itinerary will be added by the travel team.</p>
          )}
        </div>
      </article>

      <aside className="form-panel">
        <p className="card-label">Book this package</p>
        <h2>Reserve your spot</h2>

        {!user && (
          <p className="inline-note">
            You need an account before booking. <Link to="/login">Login here</Link>.
          </p>
        )}

        {error && <p className="status-banner error">{error}</p>}
        {success && <p className="status-banner success">{success}</p>}

        <form className="stack-form" onSubmit={submitBooking}>
          <label>
            Travelers
            <input
              type="number"
              min="1"
              value={form.travelersCount}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  travelersCount: event.target.value,
                }))
              }
              required
            />
          </label>

          <label>
            Travel date
            <input
              type="date"
              value={form.travelDate}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  travelDate: event.target.value,
                }))
              }
              required
            />
          </label>

          <button type="submit" className="primary-button">
            Create booking
          </button>
        </form>
      </aside>
    </section>
  );
};

export default PackageDetails;
