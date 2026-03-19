import { Link } from 'react-router-dom';

const highlights = [
  {
    title: 'Curated packages',
    description: 'Shortlist premium city breaks, beach escapes, and multi-stop adventures.',
  },
  {
    title: 'Role-aware workflow',
    description: 'Admins, marketers, finance teams, and support agents land in the right workspace.',
  },
  {
    title: 'Booking control',
    description: 'Create, update, and cancel trips from a single client flow.',
  },
];

const Home = () => {
  return (
    <div>
      <section className="hero-section">
        <div className="shell hero-grid">
          <div>
            <p className="section-kicker">Travel planning without the mess</p>
            <h1>Book ambitious trips through a cleaner travel operations stack.</h1>
            <p className="hero-copy">
              TravelEase combines discovery, booking, and role-based back-office access in a
              single starter application.
            </p>
            <div className="hero-actions">
              <Link to="/packages" className="primary-button">
                Explore packages
              </Link>
              <Link to="/register" className="ghost-button">
                Create account
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <p className="card-label">Featured escape</p>
            <h2>Kyoto Spring Circuit</h2>
            <p>7 days of temples, train rides, and guided city walks with boutique stays.</p>
            <div className="hero-stat-row">
              <div>
                <strong>7 days</strong>
                <span>Duration</span>
              </div>
              <div>
                <strong>12</strong>
                <span>Slots left</span>
              </div>
              <div>
                <strong>$1,899</strong>
                <span>Starting price</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell feature-section">
        {highlights.map((item) => (
          <article key={item.title} className="feature-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Home;
