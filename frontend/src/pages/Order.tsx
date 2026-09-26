import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBasket } from "../context/BasketContext";
import "./Order.css";

function Order() {
  return (
    <main className="order-page">
      <section className="order-header">
        <p className="order-eyebrow">FINNIESTON FEZ</p>

        <h1>Order for Collection</h1>

        <p>
          Fancy something from our menu? Give us a call and we'll be happy to
          take your collection order.
        </p>
      </section>

      <section className="order-contact">
        <h2>Call us to order</h2>

        <p>For collection orders, please contact the restaurant directly.</p>

        <a href="tel:+44XXXXXXXXXX" className="order-phone">
          +44 XXXXXX
        </a>

        <p className="order-note">
          Please call us to place your order and arrange a collection time.
        </p>
      </section>
    </main>
  );
}

export default Order;
