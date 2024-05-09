"use client";
import Cart from "@/components/cart/Cart";
import { useContext } from "react";
import { cartContext } from "../cartcontext-provider";

const page = () => {
  const { handleAddItemToCart, handleDeleteItemFromCart, cart } =
    useContext(cartContext);
  return (
    <Cart
      cart={cart}
      handleAddItemToCart={handleAddItemToCart}
      handleDeleteItemFromCart={handleDeleteItemFromCart}
    ></Cart>
  );
};

export default page;
