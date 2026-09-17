import "./Home.css";
import { Link } from "react-router-dom";

import heroPattern from "../assets/hero-pattern.jpg";
import iconFez from "../assets/icon-fez.png";
import iconTeapot from "../assets/icon-teapot.png";
import iconTable from "../assets/icon-table.png";
import iconTagine from "../assets/icon-tagine.png";
import finniestonFezLogo from "../assets/finnieston-fez-logo.png";

export default function App(): JSX.Element {
  return (
    <div className="website">
      <header className="navbar">
        <Link to="/" className="logo-link">
          <img
            className="navbar-logo-img"
            src={finniestonFezLogo}
            alt="Finnieston Fez"
          />
        </Link>
        <nav className="navigation">
          <Link to="/" className="active">
            Home
          </Link>
          <Link to="/menu">Menu</Link>
          <Link to="/booking">Book a Table</Link>
          <Link to="/order" className="order-link">
            Order<span>Collection Only</span>
          </Link>
        </nav>
      </header>

      <main>
        <section
          className="hero"
          style={{ backgroundImage: `url(${heroPattern})` }}
        >
          <div className="hero-content">
            <p className="eyebrow">MOROCCAN FOOD • COFFEE • CULTURE</p>

            <h1 className="hero-brand-name">
              Finnieston Fe
              <span className="z-letter">
                z
                <img className="z-fez-icon" src={iconFez} alt="" />
              </span>
            </h1>
            <p className="hero-location">GLASGOW</p>

            <div className="hero-buttons">
              <Link to="/menu" className="button primary-button">
                Explore the Menu
              </Link>
              <Link to="/booking" className="button secondary-button">
                Book a Table
              </Link>
            </div>
          </div>
        </section>

        <div className="tile-strip" />

        <section className="intro">
          <p className="section-label">FINNIESTON • GLASGOW</p>
          <h2>
            Moroccan flavours,
            <br />
            <span>made with love.</span>
          </h2>
        </section>

        <section className="features">
          <div className="feature-card menu-card">
            <div className="feature-icon-wrap">
              <img
                className="feature-icon-svg"
                src={iconTeapot}
                alt="Moroccan teapot"
              />
            </div>
            <h3>Our Menu</h3>
            <p>
              Discover Moroccan-inspired food, coffee, tea, sweet treats and
              more.
            </p>
            <Link to="/menu">View Menu →</Link>
          </div>

          <div className="feature-card booking-card" id="booking">
            <div className="feature-icon-wrap">
              <img
                className="feature-icon-svg"
                src={iconTable}
                alt="Moroccan table with cushions"
              />
            </div>
            <h3>Book a Table</h3>
            <p>
              Planning a brunch, dinner or special occasion? Reserve your table
              with us.
            </p>
            <Link to="/booking">Make a Reservation →</Link>
          </div>

          <div className="feature-card order-card" id="order">
            <div className="feature-icon-wrap">
              <img className="feature-icon-svg" src={iconTagine} alt="Tagine" />
            </div>
            <h3>Order for Collection</h3>
            <p>
              Fancy Finnieston Fez at home? Place your order and collect it from
              us.
            </p>
            <Link to="/order">Start Your Order →</Link>
          </div>
        </section>

        <div className="info-bar">
          <div className="info-bar-item">
            <svg
              viewBox="0 0 24 24"
              fill="#e9d8b8"
              stroke="#0a6e78"
              strokeWidth={1}
            >
              <path d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" />
              <circle cx="12" cy="9" r="2.5" fill="#0a6e78" />
            </svg>
            <h5>Finnieston</h5>
            <p>Glasgow</p>
          </div>
          <div className="info-bar-item">
            <svg
              viewBox="0 0 24 24"
              fill="#e9d8b8"
              stroke="#0a6e78"
              strokeWidth={1}
            >
              <path d="M6 8h12l1 12H5z" />
              <path
                d="M9 8V6a3 3 0 0 1 6 0v2"
                fill="none"
                stroke="#0a6e78"
                strokeWidth={1.6}
              />
            </svg>
            <h5>Collection Only</h5>
            <p>Order ahead online</p>
          </div>
          <div className="info-bar-item">
            <svg viewBox="0 0 24 24" fill="#cf8f2e">
              <path d="M12 2l2.6 6.6H21l-5.4 4.2L17.6 19 12 15l-5.6 4 2-6.2L3 8.6h6.4z" />
            </svg>
            <h5>Reservations</h5>
            <p>Book your table today</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-logo-text">Finnieston Fez</div>
        <p>Moroccan food, coffee &amp; culture in Finnieston, Glasgow.</p>
        <p className="copyright">© 2026 Finnieston Fez</p>
      </footer>
    </div>
  );
}
