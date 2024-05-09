"use client";
import Cart from "@/components/cart/Cart";
import { useContext, useEffect } from "react";
import { cartContext } from "../cartcontext-provider";
import { useRouter } from "next/navigation";
const page = () => {
  const {
    handleAddItemToCart,
    handleDeleteItemFromCart,
    cart,
    setCartContextData,
  } = useContext(cartContext);

  useEffect(() => {
    setCartContextData();
  }, []);
  return (
    <Cart
      cart={cart}
      handleAddItemToCart={handleAddItemToCart}
      handleDeleteItemFromCart={handleDeleteItemFromCart}
    ></Cart>
  );
};

export default page;
