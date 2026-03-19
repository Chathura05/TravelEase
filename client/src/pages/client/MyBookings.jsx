import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { ROLES } from '../../constants/roles';
import { useAuth } from '../../context/AuthContext';

const emptyEditState = {
  bookingId: '',
  travelersCount: 1,
  travelDate: '',
};

const formatDateInput = (value) => {
  if (!value) return '';
  return new Date(value).toISOString().slice(0, 10);
};

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [editState, setEditState] = useState(emptyEditState);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const canManageAllBookings = [ROLES.ADMIN, ROLES.FINANCE_MANAGER, ROLES.SUPPORT_AGENT].includes(
    user?.role
  );

  const loadBookings = async () => {
    try {
      const endpoint = canManageAllBookings ? '/bookings' : '/bookings/my';
      const { data } = await api.get(endpoint);
      setBookings(data);
    } catch (fetchError) {
      setError(fetchError.response?.data?.message || 'Unable to load bookings.');
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const beginEdit = (booking) => {
    setEditState({
      bookingId: booking._id,
      travelersCount: booking.travelersCount,
      travelDate: formatDateInput(booking.travelDate),
    });
    setStatus('');
    setError('');
  };

  const saveEdit = async (bookingId) => {
    try {
      await api.put(`/bookings/${bookingId}`, {
        travelersCount: Number(editState.travelersCount),
        travelDate: editState.travelDate,
      });
      setStatus('Booking updated.');
      setEditState(emptyEditState);
      loadBookings();
    } catch (updateError) {
      setError(updateError.response?.data?.message || 'Booking update failed.');
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      await api.delete(`/bookings/${bookingId}`);
      setStatus('Booking deleted.');
      setBookings((current) => current.filter((item) => item._id !== bookingId));
    } catch (deleteError) {
      setError(deleteError.response?.data?.message || 'Booking deletion failed.');
    }
  };

  return (
    <div className="dashboard-panel">
      <p className="section-kicker">Bookings</p>
      <h1>{canManageAllBookings ? 'Review booking activity.' : 'Manage active reservations.'}</h1>

      {error && <p className="status-banner error">{error}</p>}
      {status && <p className="status-banner success">{status}</p>}

      <div className="booking-list">
        {bookings.map((booking) => {
          const isEditing = editState.bookingId === booking._id;

          return (
            <article key={booking._id} className="booking-card">
              <div>
                <p className="card-label">{booking.status}</p>
                <h2>{booking.travelPackage?.title || 'Package unavailable'}</h2>
                <p>{booking.travelPackage?.destination}</p>
                {canManageAllBookings && booking.user && (
                  <p>
                    Traveler: {booking.user.name} ({booking.user.email})
                  </p>
                )}
                <p>Total: ${booking.totalPrice}</p>
                <p>Payment: {booking.paymentStatus}</p>
              </div>

              {isEditing ? (
                <div className="booking-edit-grid">
                  <label>
                    Travelers
                    <input
                      type="number"
                      min="1"
                      value={editState.travelersCount}
                      onChange={(event) =>
                        setEditState((current) => ({
                          ...current,
                          travelersCount: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label>
                    Travel date
                    <input
                      type="date"
                      value={editState.travelDate}
                      onChange={(event) =>
                        setEditState((current) => ({
                          ...current,
                          travelDate: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => saveEdit(booking._id)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="ghost-button"
                    onClick={() => setEditState(emptyEditState)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="booking-actions">
                  <p>{new Date(booking.travelDate).toLocaleDateString()}</p>
                  <button type="button" className="ghost-button" onClick={() => beginEdit(booking)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="danger-button"
                    onClick={() => deleteBooking(booking._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </article>
          );
        })}

        {!bookings.length && (
          <p className="status-banner">No bookings yet. Create one from the packages page.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
