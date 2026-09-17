import { useEffect, useState } from "react";
import { useBasket } from "../context/BasketContext";
import "./Menu.css";

type MenuItem = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string;
};

function Menu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToBasket } = useBasket();

  useEffect(() => {
    fetch("https://finnieston-fez.onrender.com/menu")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load menu");
        }

        return response.json();
      })
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load the menu.");
        setLoading(false);
      });
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(menu.map((item) => item.category))),
  ];

  const filteredMenu =
    selectedCategory === "All"
      ? menu
      : menu.filter((item) => item.category === selectedCategory);

  if (loading) {
    return (
      <main className="menu-page-state">
        <p>Loading our menu...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="menu-page-state">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="menu-page">
      {/* Header */}
      <section className="menu-header">
        <p className="menu-eyebrow">FINNIESTON FEZ</p>

        <h1>Our Menu</h1>

        <p>
          Moroccan flavours, Fez favourites and coffee creations made for
          sharing.
        </p>
      </section>

      {/* Categories */}
      <div className="category-bar">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "category-button selected"
                : "category-button"
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu */}
      <section className="menu-grid">
        {filteredMenu.map((item) => (
          <article className="menu-card" key={item.id}>
            <div className="menu-card-top">
              <h2>{item.name}</h2>

              <span className="menu-price">£{item.price.toFixed(2)}</span>
            </div>

            {item.description && (
              <p className="menu-description">{item.description}</p>
            )}

            <button
              className="add-to-order-button"
              onClick={() =>
                addToBasket({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                })
              }
            >
              Add to order
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Menu;
