import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBasket } from "../context/BasketContext";
import "./Checkout.css";

function Checkout() {
  const { basket, clearBasket } = useBasket();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [collectionTime, setCollectionTime] = useState("ASAP");
  const [notes, setNotes] = useState("");

  const total = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const placeOrder = async () => {
    try {
      const response = await fetch(
        "https://finnieston-fez.onrender.com/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName: name,
            phone,
            collectionTime,
            notes,
            items: basket.map((item) => ({
              menuItemId: item.id,
              quantity: item.quantity,
            })),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();

      clearBasket();

      navigate("/confirmation", {
        state: {
          name,
          phone,
          collectionTime,
          notes,
          orderId: data.orderId,
          total: data.total,
        },
      });
    } catch (error) {
      console.error(error);

      alert("Sorry, we couldn't place your order. Please try again.");
    }
  };

  return (
    <main className="checkout-page">
      {/* Header */}

      <section className="checkout-header">
        <p className="checkout-eyebrow">FINNIESTON FEZ</p>

        <h1>Almost there!</h1>

        <p>Just a few details and we'll get your order ready for collection.</p>
      </section>

      <div className="checkout-layout">
        {/* Customer details */}

        <section className="checkout-form">
          <h2>Your Details</h2>

          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone number</label>

            <input
              id="phone"
              type="tel"
              placeholder=""
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          {/* Collection time */}

          <div className="form-section">
            <h2>Collection Time</h2>

            <label className="radio-option">
              <input
                type="radio"
                name="collectionTime"
                value="ASAP"
                checked={collectionTime === "ASAP"}
                onChange={(event) => setCollectionTime(event.target.value)}
              />

              <div>
                <strong>ASAP — around 15 minutes</strong>

                <p>
                  Weekends can be a little busier, so please allow some extra
                  time.
                </p>
              </div>
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="collectionTime"
                value="Later"
                checked={collectionTime.startsWith("Later")}
                onChange={() => setCollectionTime("Later - 10:00 AM")}
              />

              <div className="later-time-option">
                <strong>Choose a later time</strong>

                {collectionTime.startsWith("Later") && (
                  <select
                    value={collectionTime.replace("Later - ", "")}
                    onChange={(event) =>
                      setCollectionTime(`Later - ${event.target.value}`)
                    }
                  >
                    <option value="10:00 AM">10:00 AM</option>

                    <option value="10:30 AM">10:30 AM</option>

                    <option value="11:00 AM">11:00 AM</option>

                    <option value="11:30 AM">11:30 AM</option>

                    <option value="12:00 PM">12:00 PM</option>

                    <option value="12:30 PM">12:30 PM</option>

                    <option value="1:00 PM">1:00 PM</option>

                    <option value="1:30 PM">1:30 PM</option>

                    <option value="2:00 PM">2:00 PM</option>

                    <option value="2:30 PM">2:30 PM</option>

                    <option value="3:00 PM">3:00 PM</option>

                    <option value="3:30 PM">3:30 PM</option>

                    <option value="4:00 PM">4:00 PM</option>

                    <option value="4:30 PM">4:30 PM</option>

                    <option value="5:00 PM">5:00 PM</option>

                    <option value="5:30 PM">5:30 PM</option>
                  </select>
                )}
              </div>
            </label>
          </div>

          {/* Payment */}

          <div className="form-section">
            <h2>Payment</h2>

            <div className="payment-option">
              <div className="payment-check">✓</div>

              <div>
                <strong>Pay at collection</strong>

                <p>Payment will be made when you collect your order.</p>
              </div>
            </div>
          </div>

          {/* Notes */}

          <div className="form-section">
            <h2>Anything we should know?</h2>

            <textarea
              placeholder="Optional — e.g. special requests"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
            />
          </div>
        </section>

        {/* Order summary */}

        <aside className="checkout-summary">
          <p className="checkout-summary-eyebrow">YOUR ORDER</p>

          <h2>Order Summary</h2>

          <div className="checkout-items">
            {basket.map((item) => (
              <div className="checkout-item" key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>£{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="checkout-total">
            <span>Total</span>

            <span>£{total.toFixed(2)}</span>
          </div>

          <button
            className="place-order-button"
            disabled={!name || !phone || basket.length === 0}
            onClick={placeOrder}
          >
            Place Order
          </button>

          <p className="payment-note">Payment is made at collection.</p>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;
