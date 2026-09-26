import { Link, useLocation } from "react-router-dom";
import "./BookingConfirmation.css";

function BookingConfirmation() {
  const location = useLocation();

  const name = location.state?.name || "there";

  return (
    <main className="booking-confirmation-page">
      <section className="booking-confirmation-card">
        <p className="booking-confirmation-eyebrow">FINNIESTON FEZ</p>

        <div className="booking-confirmation-icon">✓</div>

        <h1>Booking Confirmed!</h1>

        <p className="booking-confirmation-message">Thank you, {name}!</p>

        <p>
          Your table request has been submitted successfully. We will contact
          you shortly to confirm your booking.
        </p>

        <Link to="/" className="booking-confirmation-button">
          Back to Home
        </Link>
      </section>
    </main>
  );
}

export default BookingConfirmation;
