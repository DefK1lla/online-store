import { useState, FC } from "react";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import { Header } from "./components/Header";

const App: FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  const increment = (): void => {
    setCartCount(prevState => prevState + 1);
  };

  const decrement = (): void => {
    if (cartCount < 1) return;
    setCartCount(prevState => prevState - 1);
  }
  return (
    <>
      <Header
        cartCount={cartCount}
      />
      <Routes>
        <Route path="/" element={<Home onAddToCart={increment} onRemoveFromCart={decrement} />} />
        <Route path="/cart" element={<Cart onAddToCart={increment} onRemoveFromCart={decrement} />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
