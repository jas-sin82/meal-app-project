import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App(props) {
  const [cartIsShown, setCartIsShown] = useState(false);

  const cartHandlarOpen = () => {
    setCartIsShown(true);
  };

  const cartHandlareClose = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseCart={cartHandlareClose} />}
      <Header openCart={cartHandlarOpen} />
      <Meals />
    </CartProvider>
  );
}

export default App;
