"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
const AdminUpdateUser = ({ user }) => {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const router = useRouter();
  const handleUpdateUser = async (userId, updateData) => {
    try {
      const response = await fetch(`/api/admin/user_accounts/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      if (data.userUpdated === true) {
        toast.success(data.message);
        router.push("/admin/user_accounts");
        router.refresh();
      } else toast.error(data.message);
    } catch (error) {
      toast.error("Error updating product");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const userUpdateData = { name, email };

    handleUpdateUser(user?._id, userUpdateData);
  };

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Update User </h2>

        <div className="mb-4">
          <label className="block mb-1"> Full Name </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Email </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-lime-600 border border-transparent rounded-md hover:bg-lime-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateUser;
