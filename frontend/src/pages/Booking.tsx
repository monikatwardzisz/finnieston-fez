import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState("2");

  const makeBooking = async () => {
    try {
      const response = await fetch("http://localhost:3000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          date,
          time,
          people: Number(people),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to make booking");
      }

      navigate("/booking-confirmation", {
        state: {
          name,
          surname,
          date,
          time,
          people,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Sorry, we couldn't make your booking. Please try again.");
    }
  };

  return (
    <main className="booking-page">
      <section className="booking-header">
        <p className="booking-eyebrow">FINNIESTON FEZ</p>

        <h1>Book a Table</h1>

        <p>
          Join us for Moroccan food, coffee and culture in the heart of
          Finnieston.
        </p>
      </section>

      <section className="booking-form">
        <h2>Your Details</h2>

        <div className="booking-form-row">
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
            <label htmlFor="surname">Surname</label>
            <input
              id="surname"
              type="text"
              placeholder="Your surname"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
            />
          </div>
        </div>

        <div className="form-section">
          <h2>When would you like to visit?</h2>

          <div className="booking-form-row">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time</label>
              <select
                id="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
              >
                <option value="">Select a time</option>
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
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Number of People</h2>

          <div className="form-group">
            <label htmlFor="people">Guests</label>

            <select
              id="people"
              value={people}
              onChange={(event) => setPeople(event.target.value)}
            >
              <option value="1">1 person</option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
              <option value="4">4 people</option>
              <option value="5">5 people</option>
              <option value="6">6 people</option>
              <option value="7">7 people</option>
              <option value="8">8 people</option>
              <option value="9">9 people</option>
              <option value="10">10 people</option>
            </select>
          </div>
        </div>

        <button
          className="booking-button"
          disabled={!name || !surname || !date || !time || !people}
          onClick={makeBooking}
        >
          Confirm Booking
        </button>
      </section>
    </main>
  );
}

export default Booking;
