import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { redirectByRole } from '../../utils/redirectByRole';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await login(form.email.trim(), form.password);
      navigate(redirectByRole(data.role));
    } catch (submitError) {
      setError(
        submitError.response?.data?.message ||
          submitError.message ||
          'Unable to sign in. Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  return (
    <section className="auth-layout">
      <div className="auth-grid">
        <div className="auth-welcome">
          <div className="welcome-content">
            <span className="logo-text">TravelEase</span>

            <h1>Continue your journey.</h1>
            <p className="welcome-subtitle">
              Sign in to manage bookings, review itineraries, and move straight into your
              workspace.
            </p>

            <div className="welcome-features">
              <div className="feature-item">Trip management without back-and-forth email.</div>
              <div className="feature-item">Faster access to packages, bookings, and profile data.</div>
              <div className="feature-item">Instant dashboard routing for internal team roles.</div>
            </div>
          </div>
        </div>

        <div className="auth-form-container">
          <div className="form-card">
            <div className="form-header">
              <h2>Sign In</h2>
              <p className="form-subtitle">Access your TravelEase account</p>
            </div>

            {error && (
              <div className="error-banner" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
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
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="form-footer">
              <p>
                Don&apos;t have an account?{' '}
                <Link to="/register" className="link-highlight">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
