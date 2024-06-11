"use client";

import Link from "next/link";
import React from "react";

const ProfileSideBar = ({ isAdmin }) => {
  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <ul className="sidebar">
        {isAdmin === true && (
          <section>
            <li>
              {" "}
              <Link
                href="/admin/products/new"
                className="block px-3 py-2 text-gray-800 hover:bg-green-100 hover:text-green-500 rounded-md"
              >
                New Product <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/products"
                className="block px-3 py-2 text-gray-800 hover:bg-green-100 hover:text-green-500 rounded-md"
              >
                All Products <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/products"
                className="block px-3 py-2 text-gray-800 hover:bg-green-100 hover:text-green-500 rounded-md"
              >
                All Orders <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/products"
                className="block px-3 py-2 text-gray-800 hover:bg-green-100 hover:text-green-500 rounded-md"
              >
                All Users <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <hr />
          </section>
        )}

        <li>
          {" "}
          <Link
            href="/profile"
            className="block px-3 py-2 text-gray-800 hover:bg-green-100 hover:text-green-500 rounded-md"
          >
            Your Profile
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/profile/orders"
            className="block px-3 py-2 text-gray-800 hover:bg-green-100 hover:text-green-500 rounded-md"
          >
            Orders
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/profile/update"
            className="block px-3 py-2 text-gray-800 hover:bg-green-100 hover:text-green-500 rounded-md"
          >
            Update Profile
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/profile/update-password"
            className="block px-3 py-2 text-gray-800 hover:bg-green-100 hover:text-green-500 rounded-md"
          >
            Update Password
          </Link>
        </li>

        <li>
          {" "}
          <form action="/api/auth/logout">
            {" "}
            <button className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer">
              Logout
            </button>
          </form>
        </li>
      </ul>
    </aside>
  );
};

export default ProfileSideBar;
