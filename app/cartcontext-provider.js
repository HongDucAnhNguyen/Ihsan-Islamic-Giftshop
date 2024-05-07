"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const cartContext = createContext({});

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState({ cartItems: [] });
  const router = useRouter();

  const setCartContextData = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  useEffect(() => {
    setCartContextData();
  }, []);

  const handleDeleteItemFromCart = (productId) => {
    const currentCart = cart?.cartItems?.filter(
      (item) => item.productId !== productId
    );
    localStorage.setItem("cart", JSON.stringify({ cartItems: currentCart }));
    setCartContextData();
  };

  const handleAddItemToCart = async ({
    productId,
    name,
    price,
    image,
    stock,
    quantity = 1,
  }) => {
    //get item data from params
    const item = { productId, name, price, image, stock, quantity };

    //check if item already added to cart
    const existingItem = cart?.cartItems?.find(
      (cartItem) => cartItem.productId === item.productId
    );

    let currentCart;
    if (existingItem) {
      //if yes, get the item in the cart and set the previous data to the passed in data, in case the individual product was updated on the database
      currentCart = cart?.cartItems?.map((cartItem) =>
        cartItem.productId === existingItem.productId ? item : cartItem
      );
    } else {
      //if not yet added to cart, add to cart and update cartContext
      currentCart = [...(cart?.cartItems || []), item];
    }
    localStorage.setItem("cart", JSON.stringify({ cartItems: currentCart }));
    setCartContextData();
  };

  return (
    <cartContext.Provider
      value={{ cart, handleAddItemToCart, handleDeleteItemFromCart }}
    >
      {children}
    </cartContext.Provider>
  );
}
