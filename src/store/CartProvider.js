import React, { useReducer } from "react";
import CartContext from "./cart-context";

const DefaultItems = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // const updatedItems = [...state.items, action.item];
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingItemInCartIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    console.log(existingItemInCartIndex);
    const existItemInCart = state.items[existingItemInCartIndex];
    console.log(existItemInCart);
    let updatedItems;

    if (existItemInCart) {
      let updateItem = {
        ...existItemInCart,
        amount: existItemInCart.amount + action.item.amount,
      };
      console.log(updateItem);
      updatedItems = [...state.items];
      console.log(updatedItems);
      console.log(updatedItems[existingItemInCartIndex]);
      updatedItems[existingItemInCartIndex] = updateItem;
      console.log(updatedItems);
    } else {
      updatedItems = [...state.items, action.item];
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  if (action.type === "REMOVE") {
    const findExistingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    console.log(findExistingItemIndex);

    const existingItem = state.items[findExistingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    console.log(existingItem);
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[findExistingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return state;
};

const CartProvider = (props) => {
  const [cartState, dispatchCardAction] = useReducer(cartReducer, DefaultItems);

  const addItemToCartHandler = (item) => {
    dispatchCardAction({ type: "ADD", item: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCardAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
