import { Link } from 'react-router-dom';
import './Footer.css';

const currentYear = new Date().getFullYear();

const socialLinks = [
  { href: 'https://facebook.com', label: 'Facebook', short: 'FB' },
  { href: 'https://instagram.com', label: 'Instagram', short: 'IG' },
  { href: 'https://x.com', label: 'X', short: 'X' },
  { href: 'https://linkedin.com', label: 'LinkedIn', short: 'IN' },
];

const companyLinks = [
  { to: '/about', label: 'About us' },
  { to: '/careers', label: 'Careers' },
  { to: '/press', label: 'Press & Media' },
  { to: '/partners', label: 'Partners' },
];

const productLinks = [
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/integrations', label: 'Integrations' },
  { to: '/enterprise', label: 'Enterprise' },
];

const supportLinks = [
  { to: '/help', label: 'Help Center' },
  { to: '/contact', label: 'Contact us' },
  { to: '/faq', label: 'FAQs' },
];

const legalLinks = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/cookies', label: 'Cookie Policy' },
  { to: '/accessibility', label: 'Accessibility' },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="accent-bar" />

      <div className="footer-shell">
        <div className="footer-grid">
          <section className="footer-brand">
            <Link to="/" className="footer-brand__link">
              <h2>
                Travel<span>Ease</span>
              </h2>
            </Link>

            <p className="leading-relaxed">
              Sharper booking flows for modern travelers and travel teams. Plan better, travel
              smarter.
            </p>

            <div className="social" aria-label="Social links">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.label}
                >
                  {item.short}
                </a>
              ))}
            </div>
          </section>

          <nav className="footer-column" aria-label="Company">
            <h3>Company</h3>
            <ul>
              {companyLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-column" aria-label="Product">
            <h3>Product</h3>
            <ul>
              {productLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="footer-column" aria-label="Support and contact">
            <h3>Support</h3>
            <ul className="support-links">
              {supportLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>

            <div className="contact-list">
              <div className="contact-item">
                <strong>Email</strong>
                <a href="mailto:support@travelease.com">support@travelease.com</a>
              </div>
              <div className="contact-item">
                <strong>Phone</strong>
                <a href="tel:+94111234567">+94 11 123 4567</a>
              </div>
              <div className="contact-item">
                <strong>Office</strong>
                <span>Colombo, Western Province, Sri Lanka</span>
              </div>
            </div>
          </section>
        </div>

        <div className="footer-bottom border-t">
          <p className="bottom-text">(c) {currentYear} TravelEase. All rights reserved.</p>

          <div className="footer-bottom__links">
            {legalLinks.map((item) => (
              <Link key={item.to} to={item.to} className="bottom-text">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
