import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const menuItems = [
  // ─── TEA ───────────────────────────────────────────────
  { name: "Moroccan Mint Tea", description: "Classic Moroccan mint tea made with fresh mint", price: 3.99, category: "Tea" },
  { name: "Royal Moroccan Tea", description: "Freshly brewed loose tea leaves with fresh mint, peppermint and Moroccan verbena", price: 4.50, category: "Tea" },
  { name: "Berber Wedding", description: "Freshly brewed mint tea with cloves and fresh cinnamon. A traditional Berber wedding tea, served to guests leading up to the arrival of the bride", price: 4.50, category: "Tea" },
  { name: "Marrakesh Spa", description: "Freshly brewed mint tea with orange blossom, believed to have relaxing and soothing properties. Usually served in traditional Moroccan spas & hammams", price: 4.50, category: "Tea" },
  { name: "Arabian Nights", description: "Saffron tea with cardamom", price: 3.99, category: "Tea" },
  { name: "Spring Rose", description: "Black tea with rose water & fresh rose buds, a common staple in the 'Rose Valley' district of Morocco", price: 3.99, category: "Tea" },
  { name: "Breakfast Tea", description: null, price: 2.50, category: "Tea" },

  // ─── COFFEE (Regular + Fez Signature) ────────────────
  { name: "Espresso", description: null, price: 2.30, category: "Coffee" },
  { name: "Double Espresso", description: null, price: 2.60, category: "Coffee" },
  { name: "Espresso Machiato", description: null, price: 2.60, category: "Coffee" },
  { name: "Double Espresso Machiato", description: null, price: 2.80, category: "Coffee" },
  { name: "Americano", description: null, price: 2.70, category: "Coffee" },
  { name: "Flat White", description: null, price: 2.99, category: "Coffee" },
  { name: "Cortado", description: null, price: 2.99, category: "Coffee" },
  { name: "Cappuccino", description: null, price: 3.30, category: "Coffee" },
  { name: "Latte", description: null, price: 3.70, category: "Coffee" },
  { name: "Mocha", description: null, price: 3.99, category: "Coffee" },
  { name: "White Chocolate Mocha", description: null, price: 3.99, category: "Coffee" }, // price partially obscured by glare in photo - please verify
  { name: "The Moroccan Bazaar", description: "A selection of around 15 native Moroccan grown spices, freshly blended in house with our roasted coffee beans daily", price: 3.25, category: "Coffee" },
  { name: "Moroccan Bazaar + Milk", description: null, price: 3.65, category: "Coffee" },
  { name: "Café Marocain Nes-Nes", description: "Double shot espresso, topped with steamed milk", price: 3.20, category: "Coffee" },
  { name: "Cafe Bonbon", description: "A layer of condensed milk topped with hot milk and a shot of coffee", price: 3.80, category: "Coffee" },
  { name: "Fez Delight", description: "A white coffee with a nougat flavour, topped with whipped cream & nutty nougat. Inspired by the city of Fes, which hosts Morocco's oldest nougat markets", price: 4.50, category: "Coffee" },
  { name: "Coco Canella", description: "A coconut flavoured white coffee with fresh cinnamon, coconut and whipped cream", price: 4.50, category: "Coffee" },
  { name: "Café Menthe", description: "Mint flavoured, flat white textured coffee", price: 3.70, category: "Coffee" },
  { name: "Pistachino", description: "A layer of pistachio paste, topped with 2 shots of coffee, foamed milk, and whipped cream", price: 4.50, category: "Coffee" },
  { name: "Café Mogador", description: "Almond butter & honey based, topped with a double espresso, orange blossom, foamed milk and whipped cream", price: 4.50, category: "Coffee" },
  { name: "Chefchaouen City Latte", description: "A blue, popcorn flavoured latte inspired by Morocco's Blue City of Chefchaouen. Served with whipped cream and popcorn", price: 4.50, category: "Coffee" },
  { name: "Baklava Latte", description: "A double shot latte with all the nutty baklava flavours, whipped cream, crunchy nut garnish, and a piece of fresh baklava on top", price: 5.30, category: "Coffee" },

  // ─── HOT CHOCOLATES ───────────────────────────────────
  { name: "Hot Chocolate", description: null, price: 3.50, category: "Hot Chocolates" },
  { name: "Choc Orange", description: null, price: 3.99, category: "Hot Chocolates" },
  { name: "Mint Hot Chocolate", description: null, price: 3.99, category: "Hot Chocolates" },
  { name: "Choco Nut", description: null, price: 3.99, category: "Hot Chocolates" },
  { name: "Pistachio Hot Chocolate", description: null, price: 4.20, category: "Hot Chocolates" },

  // ─── ICED DRINKS (Iced Coffees + Iced Teas) ──────────
  { name: "Iced Americano", description: null, price: 3.50, category: "Iced Drinks" },
  { name: "Iced Latte", description: null, price: 3.99, category: "Iced Drinks" },
  { name: "Pistachio Iced Latte", description: "Double shot coffee, pistachio butter, pistachio syrup and milk", price: 4.99, category: "Iced Drinks" },
  { name: "Iced Moroccan Spiced Coffee", description: null, price: 4.50, category: "Iced Drinks" },
  { name: "Iced Mocha", description: null, price: 4.70, category: "Iced Drinks" },
  { name: "Iced White Chocolate Mocha", description: null, price: 4.99, category: "Iced Drinks" },
  { name: "Salted Caramel Iced Latte", description: null, price: 4.99, category: "Iced Drinks" },
  { name: "French Vanilla Iced Latte", description: null, price: 4.80, category: "Iced Drinks" },
  { name: "Lotus Biscoff Iced Latte", description: null, price: 4.99, category: "Iced Drinks" },
  { name: "Creme Brûlée Iced Latte", description: null, price: 4.80, category: "Iced Drinks" },
  { name: "Butterscotch Mocha", description: null, price: 4.99, category: "Iced Drinks" },
  { name: "Peach and Apricot", description: null, price: 4.49, category: "Iced Drinks" },
  { name: "Pomegranate", description: null, price: 4.49, category: "Iced Drinks" },
  { name: "Mango and Passion Fruit", description: null, price: 4.49, category: "Iced Drinks" },
  { name: "Lemon and Ginger", description: null, price: 4.49, category: "Iced Drinks" },
  { name: "Mint with Orange Blossom", description: null, price: 4.99, category: "Iced Drinks" },
  { name: "Rose & Cardamom", description: null, price: 4.99, category: "Iced Drinks" },

  // ─── SMOOTHIES ────────────────────────────────────────
  { name: "Smoothie of the Day", description: null, price: 4.99, category: "Smoothies" },

  // ─── MILKSHAKES ───────────────────────────────────────
  { name: "Chocolate", description: null, price: 5.50, category: "Milkshakes" },
  { name: "Almond & Pistachio", description: null, price: 5.50, category: "Milkshakes" },
  { name: "Lotus Biscoff", description: null, price: 5.50, category: "Milkshakes" },
  { name: "Rose and Coconut", description: null, price: 5.50, category: "Milkshakes" },
  { name: "Honey Almond, Cinnamon", description: null, price: 5.50, category: "Milkshakes" },
  { name: "Avocado, Dried Fruit & Honey", description: null, price: 5.50, category: "Milkshakes" },

  // ─── LEMONADES ────────────────────────────────────────
  { name: "Romana", description: "Pomegranate and orange blossom", price: 4.99, category: "Lemonades" },
  { name: "Laymouna", description: "Lemon, blue curacao & orange blossom", price: 4.99, category: "Lemonades" },
  { name: "Warda", description: "Apple and rose water", price: 4.99, category: "Lemonades" },
  { name: "Farawla", description: "Strawberry, mint & lime", price: 4.99, category: "Lemonades" },
  { name: "Sahara Cooler", description: "Cola, cinnamon & vanilla", price: 4.99, category: "Lemonades" },
  { name: "Marrakesh Express", description: "Apple, mint & ginger", price: 4.99, category: "Lemonades" },
  { name: "Guava Fruitty", description: "Guava, apple & pomegranate", price: 4.99, category: "Lemonades" }, // name partially obscured in photo - please verify spelling
  { name: "Virgin Piña Colada", description: "Pineapple and coconut", price: 4.99, category: "Lemonades" },

  // ─── SOFT DRINKS ──────────────────────────────────────
  { name: "Soft Drinks", description: null, price: 1.99, category: "Soft Drinks" },
  { name: "Sparkling Water", description: null, price: 1.99, category: "Soft Drinks" },
  { name: "Still Water", description: null, price: 1.50, category: "Soft Drinks" },

  // ─── PANINIS / BAGUETTES ──────────────────────────────
  { name: "Tuna Harissa", description: null, price: 6.99, category: "Paninis" },
  { name: "Tuna Harissa & Brie", description: null, price: 7.99, category: "Paninis" },
  { name: "Turkish Sausage", description: "Similar to chorizo, a Turkish spiced sausage, sliced & lightly fried and topped with cheese", price: 6.99, category: "Paninis" },
  { name: "Turkish Sausage & Brie", description: null, price: 8.99, category: "Paninis" },
  { name: "El Pescador", description: "Seafood of the day, usually a combination of scallops, king prawns and mussels, fresh garlic, cooked in a rich coriander & tomato sauce, topped with mozzarella", price: 7.99, category: "Paninis" },
  { name: "Marinated Chicken", description: "Chicken breast marinated in the 7 spices of Morocco & cooked on the grill with parsley, garlic & coriander", price: 7.99, category: "Paninis" },
  { name: "Kofta", description: "Moroccan spiced lamb kofta with cumin & coriander", price: 7.99, category: "Paninis" },
  { name: "Spicy Moroccan Sausage", description: "Moroccan spiced beef & lamb sausage links, lightly fried with onions and tomatoes, parsley and coriander", price: 7.99, category: "Paninis" },
  { name: "Charcuterie Melt", description: "A selection of deli meats topped with mozzarella cheese & chilli mayo", price: 7.49, category: "Paninis" },
  { name: "Falafel & Hummus", description: null, price: 6.99, category: "Paninis" },
  { name: "Falafel & Hummus with Brie", description: null, price: 7.49, category: "Paninis" },
  { name: "Persian Style Aubergine", description: "Walnut stuffed pickled aubergine with red pepper, topped on a bed of aubergine & fenugreek dip", price: 7.49, category: "Paninis" },
  { name: "Roast Pepper and Chilli Hummus", description: null, price: 7.19, category: "Paninis" },
  { name: "Sundried Tomato Melt", description: null, price: 6.99, category: "Paninis" },

  // ─── EXTRAS ───────────────────────────────────────────
  { name: "Harissa (Extra)", description: null, price: 0.80, category: "Extras" },
  { name: "Brie (Extra)", description: null, price: 1.50, category: "Extras" },
  { name: "Fez Special Sauce", description: null, price: 0.80, category: "Extras" },
  { name: "Gluten Free Bread", description: null, price: 1.00, category: "Extras" },
  { name: "Plant Based Milk (Alpro)", description: null, price: 0.40, category: "Extras" },
  { name: "Whipped Cream", description: null, price: 0.50, category: "Extras" },
  { name: "Vegan Whipped Cream", description: null, price: 0.60, category: "Extras" },
  { name: "Shot of Coffee", description: null, price: 0.40, category: "Extras" },
  { name: "Extra Milk", description: null, price: 0.20, category: "Extras" },
  { name: "Bread (Extra)", description: null, price: 1.50, category: "Extras" },
  { name: "Halva (Extra)", description: null, price: 1.50, category: "Extras" },

  // ─── PANCAKES ─────────────────────────────────────────
  { name: "Honey & Butter Pancake", description: "Light & fluffy vegan semolina-based pancakes served with topping of your choice", price: 5.99, category: "Pancakes" },
  { name: "Pistachio Chocolate Pancake", description: "Light & fluffy vegan semolina-based pancakes served with topping of your choice", price: 6.99, category: "Pancakes" },
  { name: "Dark Chocolate & Pomegranate Pancake", description: "Light & fluffy vegan semolina-based pancakes served with topping of your choice", price: 6.99, category: "Pancakes" },
  { name: "Amlou, Nuts and Orange Blossom Pancake", description: "Light & fluffy vegan semolina-based pancakes served with topping of your choice", price: 6.99, category: "Pancakes" },

  // ─── TAGINES (served with a basket of bread and two sides) ──
  { name: "Kofta Tagine", description: "Moroccan marinated meatball stew with a spiced tomato base, topped with a baked egg", price: 14.99, category: "Tagines" },
  { name: "Sea Food Tagine", description: "A mixture of seafood of the day (prawn, mussels and scallops) cooked in a Moroccan spiced marinade", price: 14.99, category: "Tagines" },
  { name: "Liver Tagine", description: "Transferred to continue cooking in a tagine, topped with Moroccan marinated olives", price: 13.99, category: "Tagines" },
  { name: "Moroccan Sausage Tagine (Mergaz)", description: "Moroccan spiced beef & lamb sausage links lightly fried with onions and tomatoes, parsley and coriander", price: 14.99, category: "Tagines" },

  // ─── SOUPS (served with bread) ───────────────────────
  { name: "Harira", description: null, price: 5.49, category: "Soups" },
  { name: "Moroccan Bean Soup", description: null, price: 5.49, category: "Soups" },

  // ─── BOARDS ───────────────────────────────────────────
  { name: "Mediterranean Snackboard", description: "A selection of Mediterranean dips, cheese, meats, bread, olives and more. Available Regular, Vegetarian or Vegan", price: 19.99, category: "Boards" },

  // ─── CROISSANTS ───────────────────────────────────────
  { name: "Chocolate and Nuts Croissant", description: null, price: 4.99, category: "Croissants" },
  { name: "Pistachio Croissant", description: null, price: 4.99, category: "Croissants" },
  { name: "Biscoff Croissant", description: null, price: 4.99, category: "Croissants" },
  { name: "Raspberry and White Chocolate Croissant", description: null, price: 4.99, category: "Croissants" },
  { name: "Amlou Croissant", description: null, price: 4.99, category: "Croissants" },
  { name: "Ice Cream Stuffed Croissant", description: "With chocolate and raspberry sauce", price: 6.99, category: "Croissants" },
  { name: "Charcuterie and Brie Croissant", description: null, price: 6.99, category: "Croissants" },
  { name: "Eggs and Cheese Croissant", description: null, price: 6.99, category: "Croissants" },
  { name: "Tuna Harissa Croissant", description: null, price: 6.99, category: "Croissants" },

  // ─── SIDES ────────────────────────────────────────────
  { name: "Hummus", description: null, price: 3.99, category: "Sides" },
  { name: "Chilli Hummus", description: null, price: 3.99, category: "Sides" },
  { name: "Babaganoush", description: null, price: 3.99, category: "Sides" },
  { name: "Roast Pepper Dip", description: null, price: 3.99, category: "Sides" },
  { name: "Zaalouk", description: null, price: 3.99, category: "Sides" },
  { name: "Moroccan Lentils", description: null, price: 3.99, category: "Sides" },
  { name: "Trio of Sides", description: null, price: 10.99, category: "Sides" },
  { name: "Berber Sweet Board", description: "Selection of Mediterranean sweets, luxury stuffed dates, dried fruits & nuts", price: 11.99, category: "Sides" },

  // ─── DESSERTS ─────────────────────────────────────────
  { name: "Baklava and Ice Cream", description: null, price: 4.99, category: "Desserts" },
  { name: "Rose Bomb", description: "Ice cream with an orange blossom base served in rose syrup & rose water with rose petals", price: 4.99, category: "Desserts" },
  { name: "Saffron Deluxe", description: "Ice cream infused with saffron flavour & pistachio garnish", price: 4.99, category: "Desserts" },
  { name: "Nutty Mogador", description: "Ice cream served with orange blossom, clear honey and topped with fresh nuts", price: 4.99, category: "Desserts" },

  // ─── BREAKFAST (Moroccan Breakfast for One - comes with a basket of bread) ──
  { name: "Express", description: "Veg omelette, croissant, honey and soft cheese with zaatar, butter, jam and marinated olives", price: 12.99, category: "Breakfast" },
  { name: "Fes", description: "Eggs with Moroccan preserved beef, Moroccan flat bread (cheese and zaatar), honey, butter, halva, cheese and Amlou", price: 14.99, category: "Breakfast" },
  { name: "Casablanca", description: "Cheese omelette, pistachio croissant, Amlou, soft white cheese, jam, olive oil, zaatar and marinated olives", price: 14.99, category: "Breakfast" },
  { name: "Berber", description: "Cheese and tomato egg tagine (Amazigh style), Amlou, butter, olive oil marinated olives, honey, cheese and Mseman (harissa and zaatar)", price: 14.99, category: "Breakfast" },
  { name: "Jardin Majorelle", description: "Chakchuka, vegan cheese, mseman (babaganoush and pomegranate), hummus, marinated olives", price: 14.99, category: "Breakfast" },
  { name: "Tetouan", description: "Omelette with charcuterie, mseman (hummus and zaatar), brie, soft salted white cheese, Amlou, honey, jam and marinated olives", price: 14.99, category: "Breakfast" },
  { name: "Marrakesh", description: "Eggs and kofta tagine (lamb mince), harissa and zaatar mseman, aubergine with tahini, soft cheese, halva, olive oil, jam and marinated olives", price: 17.99, category: "Breakfast" },
  { name: "Finnieston Fez", description: "Eggs with Mergaz (spicy Moroccan sausage), hummus, marinated olives, cheese with zaatar, jam, pistachio flatbread, strawberries and grapes", price: 17.99, category: "Breakfast" },
  { name: "Tiznit", description: "Seafood tagine (out of the shell), hummus, aubergine dip, soft white cheese with zaatar, marinated olives", price: 17.99, category: "Breakfast" },

  // ─── BRUNCH ───────────────────────────────────────────
  {
    name: "Brunch for Two",
    description:
      "Can be served vegan or vegetarian. Both a sweet & savoury Msemmen (flatbread), Moroccan spiced baked eggs with preserved beef or vegetarian shakshuka, a side of bread accompanied by a variety of dips, fruits, nuts, cheese and more. Served with a pot of Moroccan mint tea to share. Contents may vary",
    price: 39.99,
    category: "Brunch",
  },

  // ─── MSEMMEN (Moroccan Flatbread) — Savoury ──────────
  { name: "Harissa Roast Pepper, Zaatar and Tahini Msemmen", description: "Lightly fried thin Moroccan dough with the topping of your choice", price: 5.50, category: "Msemmen" },
  { name: "Chilli Hummus Msemmen", description: "Lightly fried thin Moroccan dough with the topping of your choice", price: 5.50, category: "Msemmen" },
  { name: "Babaganoush and Pomegranate Msemmen", description: "Lightly fried thin Moroccan dough with the topping of your choice", price: 5.50, category: "Msemmen" },
  { name: "Cheese Spread and Zaatar Msemmen", description: "Lightly fried thin Moroccan dough with the topping of your choice", price: 5.50, category: "Msemmen" },
  { name: "Olive Oil and Zaatar Msemmen", description: "Lightly fried thin Moroccan dough with the topping of your choice", price: 4.99, category: "Msemmen" },
  { name: "Eggs and Cheese Msemmen", description: "Lightly fried thin Moroccan dough with the topping of your choice", price: 7.99, category: "Msemmen" },

  // ─── MSEMMEN (Moroccan Flatbread) — Sweet ────────────
  { name: "Honey & Butter Msemmen", description: "Lightly fried thin Moroccan dough with the topping of your choice", price: 4.99, category: "Msemmen" },
  { name: "Plant Based Butter & Syrup Msemmen", description: "Lightly fried thin Moroccan dough with the topping of your choice", price: 4.99, category: "Msemmen" },
  { name: "Cheese Spread & Honey Msemmen", description: "Lightly fried thin Moroccan dough with the topping of your choice", price: 5.50, category: "Msemmen" },
  { name: "Amlou Msemmen", description: "Moroccan almond and argan oil butter", price: 5.99, category: "Msemmen" },
  { name: "Pistachio Msemmen", description: "Topped with pistachio sauce and garnish", price: 5.99, category: "Msemmen" },
  { name: "Biscoff Msemmen", description: "Lightly fried thin Moroccan dough with the topping of your choice", price: 5.99, category: "Msemmen" },
  { name: "Chocolate and Nuts Msemmen", description: "Lightly fried thin Moroccan dough with the topping of your choice", price: 5.99, category: "Msemmen" },
];

async function main() {
  console.log(`Seeding ${menuItems.length} menu items...`);

  // Wipe existing rows so re-running the seed doesn't create duplicates
  await prisma.menuItem.deleteMany();

  await prisma.menuItem.createMany({
    data: menuItems,
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });