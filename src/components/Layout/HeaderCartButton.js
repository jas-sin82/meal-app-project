import { useContext, useState, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [isCartHighlight, setIsCartHighlight] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const btnhighlight = `${classes.button} ${
    isCartHighlight ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsCartHighlight(true);

    const timer = setTimeout(() => {
      setIsCartHighlight(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const numberOfCartItems = items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  return (
    <button className={btnhighlight} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      {/* <span>Your Cart</span> */}
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
