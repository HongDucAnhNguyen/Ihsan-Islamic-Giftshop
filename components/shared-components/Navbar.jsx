// "use client";
// import React, { useContext, useEffect } from "react";

import Link from "next/link";
import SearchBar from "./SearchBar";
import Image from "next/image";

import {
  getAccountSessionData,
  getCartSessionData,
} from "@/lib/helpers/getSessionData";

const getCartLength = async (user) => {
  try {
    if (user?.username) {
      const response = await fetch(
        `${process.env.BASE_URL}/api/cart?userId=${user?.userId}`,
        {
          method: "GET",
        }
      );
      const cartData = await response.json();

      return cartData?.items?.length;
    } else {
      const cartData = await getCartSessionData();

      return cartData?.cart?.length;
    }
  } catch (error) {}
};

const Navbar = async () => {
  const user = await getAccountSessionData();
  const cartLength = await getCartLength(user);

  return (
    <nav className="py-5 border-b">
      <div className="container max-w-screen-2xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5">
            <a href="/">
              <Image
                src="/images/logo.png"
                height="40"
                width="120"
                alt="Ihsan"
              />
            </a>
          </div>
          <SearchBar />

          <div className="flex items-center space-x-2 ml-auto">
            <Link
              href="/quran"
              className="px-3 py-2 inline-block text-center text-gray-700  hover:text-lime-700 font-semibold "
            >
              Quran
            </Link>

            <Link
              href="/mens-clothing"
              className="px-3 py-2 inline-block text-center text-gray-700  hover:text-lime-700 font-semibold "
            >
              Mens Clothing
            </Link>
            <Link
              href="/womens-clothing"
              className="px-3 py-2 inline-block text-center text-gray-700  hover:text-lime-700 font-semibold "
            >
              Womens Clothing
            </Link>
            <Link
              href="/accessories"
              className="px-3 py-2 inline-block text-center text-gray-700  hover:text-lime-700 font-semibold "
            >
              Accessories
            </Link>
            <Link
              href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
              <span className="hidden lg:inline ml-1">
                Cart (<b>{cartLength > 0 ? cartLength : 0}</b>)
              </span>
            </Link>
            {!user?.username && (
              <Link
                href="/login"
                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
              >
                <i className="text-gray-400 w-5 fa fa-user"></i>
                <span className="hidden lg:inline ml-1">Sign in</span>
              </Link>
            )}
            {user?.username && (
              <Link href="/profile">
                <div className="cursor-pointer">
                  <img
                    className="w-10 h-10 object-cover rounded-full"
                    src={user?.userAvatar?.url || "/images/default_avatar.png"}
                  />
                </div>
              </Link>
            )}
          </div>

          <div className="lg:hidden ml-2">
            <button
              type="button"
              className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
            >
              <span className="sr-only">Open menu</span>
              <i className="fa fa-bars fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
