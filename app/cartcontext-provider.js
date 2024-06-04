"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const cartContext = createContext({});

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState({ cartItems: [] });
  const [checkoutData, setCheckoutData] = useState();
  const router = useRouter();
  const setCartContextData = async () => {
    const isUserLoggedInResponse = await fetch("/api/auth/is-logged-in", {
      method: "GET",
    });
    const { isLoggedIn, userId } = await isUserLoggedInResponse.json();
    if (isLoggedIn) {
      const response = await fetch(`/api/cart?userId=${userId}`, {
        method: "GET",
      });
      const data = await response.json();
      setCart({ ...cart, cartItems: data?.items });
    } else {
      const response = await fetch("/api/auth/guest-cart-session", {
        method: "GET",
      });
      const { sessionData } = await response.json();
      setCart(
        sessionData?.cart?.length
          ? { ...cart, cartItems: sessionData?.cart }
          : { ...cart, cartItems: [] }
      );
    }

    //setCheckoutContextData();
  };

  const setCheckoutContextData = async () => {
    const checkoutSessionDataResponse = await fetch(
      "/api/auth/checkout-session",
      {
        method: "GET",
      }
    );
    const { sessionData } = await checkoutSessionDataResponse.json();
    setCheckoutData(sessionData);
  };

  useEffect(() => {
    setCartContextData();
  }, []);

  const handleDeleteItemFromCart = async (productId) => {
    const currentCart = cart?.cartItems?.filter(
      (item) => item.productId !== productId
    );

    const isUserLoggedInResponse = await fetch("/api/auth/is-logged-in", {
      method: "GET",
    });
    const { isLoggedIn, userId } = await isUserLoggedInResponse.json();

    if (isLoggedIn) {
      await fetch(`/api/cart?userId=${userId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ cartData: currentCart }),
      });
    } else {
      await fetch("/api/auth/guest-cart-session", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(currentCart),
      });
    }
    setCartContextData();
    router.refresh();
  };

  const handleAddItemToCart = async ({
    productId,
    name,
    price,
    image,
    stock,
    quantity,
  }) => {
    if (cart?.cartItems?.length === 5) {
      console.log("max number of items in cart reached");
      return;
    }
    //get item data from params
    const item = {
      productId,
      name,
      price,
      image,
      stock,
      quantity,
    };

    //check if item already added to cart
    const existingItem = cart?.cartItems?.find(
      (cartItem) => cartItem.productId === item.productId
    );

    let currentCart;
    if (existingItem) {
      //if yes, get the item in the cart and set the previous data to the passed in data, this handles changing cart item's quantity
      currentCart = cart?.cartItems?.map((cartItem) =>
        cartItem.productId === existingItem.productId ? item : cartItem
      );
    } else {
      //if not yet added to cart, add to cart and update cartContext
      currentCart = [...(cart?.cartItems || []), item];
    }

    const isUserLoggedInResponse = await fetch("/api/auth/is-logged-in", {
      method: "GET",
    });
    const { isLoggedIn, userId } = await isUserLoggedInResponse.json();

    if (isLoggedIn) {
      await fetch(`/api/cart?userId=${userId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ cartData: currentCart }),
      });
    } else {
      await fetch("/api/auth/guest-cart-session", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(currentCart),
      });

      //await fetch to session api w body: currentCart
    }

    setCartContextData();
    router.refresh();
  };

  const saveCheckoutTotal = async ({ amount, tax, totalAmount }) => {
    await fetch("/api/auth/checkout-session", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ amount, tax, totalAmount }),
    });
  };

  return (
    <cartContext.Provider
      value={{
        cart,

        setCartContextData,
        handleAddItemToCart,
        handleDeleteItemFromCart,
        saveCheckoutTotal,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
