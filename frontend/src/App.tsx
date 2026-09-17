import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";

import { BasketProvider } from "./context/BasketContext";

function App() {
  return (
    <BrowserRouter>
      <BasketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/order" element={<Order />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route
            path="/booking-confirmation"
            element={<BookingConfirmation />}
          />
        </Routes>
      </BasketProvider>
    </BrowserRouter>
  );
}

export default App;
