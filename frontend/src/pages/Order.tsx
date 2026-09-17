import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBasket } from "../context/BasketContext";
import "./Order.css";

type MenuItem = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string;
};

function Order() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { basket, addToBasket, removeFromBasket } = useBasket();

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((response) => response.json())
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getQuantity = (id: number) => {
    const item = basket.find((item) => item.id === id);

    return item ? item.quantity : 0;
  };

  const total = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const categories = Array.from(new Set(menu.map((item) => item.category)));

  if (loading) {
    return (
      <main className="order-page">
        <section className="order-header">
          <p className="order-eyebrow">FINNIESTON FEZ</p>

          <h1>Order for Collection</h1>

          <p>Loading our menu...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="order-page">
      {/* Header */}
      <section className="order-header">
        <p className="order-eyebrow">FINNIESTON FEZ</p>

        <h1>Order for Collection</h1>

        <p className="order-intro">
          Choose your favourites and we'll have them ready for you to collect.
        </p>

        <p className="collection-message">
          Collection only · Usually ready in around 15 minutes.
          <br />
          Weekends can be a little busier, so please allow some extra time.
        </p>
      </section>

      {/* Menu by category */}
      <section className="order-menu">
        {categories.map((category) => {
          const categoryItems = menu.filter(
            (item) => item.category === category,
          );

          return (
            <div className="order-category" key={category}>
              <h2 className="order-category-title">{category}</h2>

              <div className="order-category-items">
                {categoryItems.map((item) => {
                  const quantity = getQuantity(item.id);

                  return (
                    <article className="order-menu-item" key={item.id}>
                      <div className="order-item-info">
                        <div className="order-item-top">
                          <h3>{item.name}</h3>

                          <span>£{item.price.toFixed(2)}</span>
                        </div>

                        {item.description && <p>{item.description}</p>}
                      </div>

                      <div className="quantity-controls">
                        <button
                          onClick={() => removeFromBasket(item.id)}
                          disabled={quantity === 0}
                        >
                          −
                        </button>

                        <span>{quantity}</span>

                        <button
                          onClick={() =>
                            addToBasket({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                            })
                          }
                        >
                          +
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* Order summary */}
      <section className="order-summary">
        <p className="summary-eyebrow">YOUR ORDER</p>

        <h2>Your Basket</h2>

        {basket.length === 0 ? (
          <p className="empty-order">
            Your order is currently empty. Add something delicious above.
          </p>
        ) : (
          <>
            <div className="summary-items">
              {basket.map((item) => (
                <div className="summary-item" key={item.id}>
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-total">
              <span>Total</span>

              <span>£{total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="checkout-button">
              Continue to Checkout
            </Link>
          </>
        )}
      </section>
    </main>
  );
}

export default Order;
