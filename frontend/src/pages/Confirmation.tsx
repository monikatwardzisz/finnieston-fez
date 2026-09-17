import { Link, useLocation } from "react-router-dom";
import "./Confirmation.css";

function Confirmation() {
  const location = useLocation();

  const name = location.state?.name || "there";
  const collectionTime = location.state?.collectionTime || "ASAP";

  return (
    <main className="confirmation-page">
      <section className="confirmation-card">
        <p className="confirmation-eyebrow">FINNIESTON FEZ</p>

        <div className="confirmation-icon">✓</div>

        <h1>Thank you, {name}!</h1>

        <p className="confirmation-message">Your order has been received.</p>

        <p>We're getting everything ready for your collection.</p>

        <div className="confirmation-details">
          <div>
            <span>Collection</span>

            <strong>
              {collectionTime === "ASAP"
                ? "Approximately 15 minutes"
                : collectionTime.replace("Later - ", "")}
            </strong>
          </div>

          <div>
            <span>Payment</span>

            <strong>Pay at collection</strong>
          </div>
        </div>

        <Link to="/" className="confirmation-button">
          Back to Home
        </Link>
      </section>
    </main>
  );
}

export default Confirmation;
