"use client";

import React, { useContext, useEffect, useState } from "react";

import Link from "next/link";
import { cartContext } from "@/app/cartcontext-provider";
import { useRouter } from "next/navigation";
const Cart = () => {
  const router = useRouter();
  const {
    handleAddItemToCart,
    handleDeleteItemFromCart,
    cart,
    setCartContextData,
    saveCheckoutTotal,
  } = useContext(cartContext);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountWithoutTax, setAmountWithoutTax] = useState(0);
  const calculateTotalAmount = () => {
    //calculate the total price for all items without tax
    const calculatedAmountWithoutTax = cart?.cartItems?.reduce(
      (acc, item) => acc + parseFloat((item.quantity * item.price).toFixed(2)),
      0
    );
    setAmountWithoutTax(calculatedAmountWithoutTax);
    setTaxAmount((amountWithoutTax * 0.03).toFixed(2));
    setTotalAmount((amountWithoutTax + Number(taxAmount)).toFixed(2));

    saveCheckoutTotal({
      amount: amountWithoutTax,
      tax: taxAmount,
      totalAmount: totalAmount,
    });
  };

  const increaseQty = (cartItem) => {
    const newQty = cartItem?.quantity + 1;
    if (newQty > Number(cartItem.stock)) return;

    const item = { ...cartItem, quantity: newQty };

    handleAddItemToCart(item);
  };

  const decreaseQty = (cartItem) => {
    const newQty = cartItem?.quantity - 1;

    if (newQty <= 0) {
      handleDeleteItemFromCart(cartItem?.productId);
      return;
    }
    const item = { ...cartItem, quantity: newQty };
    handleAddItemToCart(item);
  };

  useEffect(() => {
    setCartContextData();
  }, []);
  //run after every render
  useEffect(() => {
    calculateTotalAmount();
  });

  return (
    <>
      <section className="py-5 sm:py-7 bg-lime-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2">
            {cart?.cartItems?.length || 0} Item(s) in Cart
          </h2>
        </div>
      </section>

      {cart?.cartItems?.length === 0 && (
        <div className="text-center">
          <h1 className=" py-10 text-2xl font-bold">
            There are no items in your cart.
          </h1>
        </div>
      )}

      {cart?.cartItems?.length > 0 && (
        <section className="py-10">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <main className="md:w-3/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  {cart?.cartItems?.map((cartItem) => (
                    <div key={cartItem?.productId}>
                      <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                        <div className="w-full lg:w-2/5 xl:w-2/4">
                          <figure className="flex leading-5">
                            <div>
                              <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                <img src={cartItem.image} alt={cartItem.name} />
                              </div>
                            </div>
                            <figcaption className="ml-3">
                              <p>
                                <a
                                  href={`/product/${cartItem.productId}`}
                                  className="hover:text-lime-600"
                                >
                                  {cartItem.name}
                                </a>
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="w-24">
                          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button
                              data-action="decrement"
                              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                              onClick={() => {
                                decreaseQty(cartItem);
                              }}
                            >
                              <span className="m-auto text-2xl font-thin">
                                −
                              </span>
                            </button>
                            <input
                              type="number"
                              className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none custom-input-number"
                              name="custom-input-number"
                              value={cartItem.quantity}
                              readOnly
                            ></input>
                            <button
                              data-action="increment"
                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                              onClick={() => {
                                increaseQty(cartItem);
                              }}
                            >
                              <span className="m-auto text-2xl font-thin">
                                +
                              </span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="leading-5">
                            <p className="font-semibold not-italic">
                              ${(cartItem.price * cartItem.quantity).toFixed(2)}
                            </p>
                            <small className="text-gray-400">
                              {" "}
                              ${cartItem.price} / per item{" "}
                            </small>
                          </div>
                        </div>
                        <div className="flex-auto">
                          <div className="float-right">
                            <a
                              className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                handleDeleteItemFromCart(cartItem?.productId);
                              }}
                            >
                              Remove
                            </a>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />
                    </div>
                  ))}
                </article>
              </main>
              <aside className="md:w-1/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  <ul className="mb-5">
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Amount before Tax:</span>
                      <span>${amountWithoutTax}</span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Total Units:</span>
                      <span className="text-green-500">
                        {cart?.cartItems?.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}{" "}
                        (Units)
                      </span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>TAX:</span>
                      <span>${taxAmount}</span>
                    </li>
                    <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                      <span>Total price:</span>
                      <span>${totalAmount}</span>
                    </li>
                  </ul>

                  <Link
                    href="/shipping"
                    className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                  >
                    Continue
                  </Link>

                  <Link
                    href="/"
                    className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                  >
                    Keep shopping
                  </Link>
                </article>
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
