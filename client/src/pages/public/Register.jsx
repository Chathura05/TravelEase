import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { redirectByRole } from '../../utils/redirectByRole';
import './Login.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await register({
        ...form,
        email: form.email.trim(),
      });
      navigate(redirectByRole(data.role));
    } catch (submitError) {
      setError(submitError.response?.data?.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-layout">
      <div className="auth-grid">
        <div className="auth-welcome auth-welcome-register">
          <div className="welcome-content">
            <span className="logo-text">TravelEase</span>

            <h1>Create your account.</h1>
            <p className="welcome-subtitle">
              Join as a registered client and start booking trips without waiting on manual setup.
            </p>

            <div className="welcome-features">
              <div className="feature-item">Create bookings as soon as your account is ready.</div>
              <div className="feature-item">Keep profile and contact details in one place.</div>
              <div className="feature-item">Use the same account across future TravelEase features.</div>
            </div>
          </div>
        </div>

        <div className="auth-form-container">
          <div className="form-card">
            <div className="form-header">
              <h2>Create Account</h2>
              <p className="form-subtitle">Set up your TravelEase profile</p>
            </div>

            {error && (
              <div className="error-banner" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={submitHandler} noValidate>
              <div className="form-group">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-email">Email address</label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+94 77 123 4567"
                  value={form.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-password">Password</label>
                <div className="password-wrapper">
                  <input
                    id="register-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Minimum 6 characters"
                    value={form.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="form-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="link-highlight">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
