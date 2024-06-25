"use client";

import React from "react";
import Link from "next/link";
import AccountAddress from "../address/AccountAddress";

const Profile = ({ user, addresses }) => {
  return (
    <main>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <img
            className="w-26 h-16 rounded-full mr-4"
            src={user?.userAvatar?.url || "/images/default_avatar.png"}
            alt={user?.username}
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{user?.username}</h5>
          <p>
            <b>Email:</b> {user?.userEmail} | <b>Joined On:</b>
            {user?.userJoined.substring(0, 10)}
          </p>
        </figcaption>
      </figure>

      <hr className="my-4" />
      <AccountAddress addresses={addresses}></AccountAddress>
      <Link href="/address/new">
        <button className="px-4 py-2 inline-block text-lime-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 fa fa-plus"></i> Add new address
        </button>
      </Link>
      <hr className="my-4" />
    </main>
  );
};

export default Profile;
