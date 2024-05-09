"use client";

import React from "react";
// import UserAddresses from "../user/UserAddresses";
import Link from "next/link";

const Profile = ({ user }) => {
  return (
    <>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={"/images/default_avatar.png"}
            alt={user?.username}
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{user?.username}</h5>
          <p>
            <b>Email:</b> {user?.userEmail} | <b>Joined On:</b>
            {user?.userJoined}
          </p>
        </figcaption>
      </figure>

      <hr className="my-4" />

      {/* <UserAddresses /> */}

      <Link href="/address/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 fa fa-plus"></i> Add new address
        </button>
      </Link>

      <hr className="my-4" />
    </>
  );
};

export default Profile;
