import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const ctrx = useContext(CartContext);
  const totalAmount = `$${ctrx.totalAmount.toFixed(2)}`;
  const hasItems = ctrx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    ctrx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctrx.addItem({ ...item, amount: +1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {hasItems && <h2 className={classes.heading}>Your Order</h2>}
      {ctrx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClick={props.onCloseCart}>
      {cartItems}
      {!hasItems && (
        <div>
          <h4> Cart is empty! </h4>
        </div>
      )}
      {hasItems && (
        <div>
          <span>Total Amount</span>
          <span> {totalAmount}</span>
        </div>
      )}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          keep shopping
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
