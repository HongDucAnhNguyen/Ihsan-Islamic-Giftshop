// "use client";
// import React, { useContext, useEffect } from "react";

import Link from "next/link";
import SearchBar from "./SearchBar";
import Image from "next/image";

import { getSessionData } from "@/backend/helpers/getSessionData";

// import { cartContext } from "@/app/cartcontext-provider";
// import { AuthContext } from "@/app/authcontext-provider";

const Navbar = async () => {
  // const { cart } = useContext(cartContext);
  // const { user, handleLogoutUser } = useContext(AuthContext);
  const user = await getSessionData();

  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
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
              href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
              <span className="hidden lg:inline ml-1">
                Cart
                {/* Cart (<b>{cart?.cartItems?.length}</b>) */}
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
                <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                  <img
                    className="w-10 h-8 rounded-full"
                    src={"/images/default_avatar.png"}
                  />
                  <div className="space-y-1 font-medium">
                    <p>
                      {user?.username}
                      <time className="block text-sm text-gray-500 dark:text-gray-400"></time>
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {user?.username && (
              <form action="/api/auth/logout">
                {" "}
                <button
                  type="submit"
                  className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
                >
                  Logout
                </button>
              </form>
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
    </header>
  );
};

export default Navbar;
