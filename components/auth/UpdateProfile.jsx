"use client";

import React, { useState, useEffect, useContext } from "react";
// import { toast } from "react-toastify";
import { AuthContext } from "@/app/authcontext-provider";
const UpdateProfile = ({ user }) => {
  const { handleUpdateProfile } = useContext(AuthContext);

  const [name, setName] = useState(user?.username);
  const [email, setEmail] = useState(user?.userEmail);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user?.userAvatar?.url || "/images/default_avatar.png"
  );

  // useEffect(() => {
  //   if (user) {
  //     setName(user.username);
  //     setEmail(user.userEmail);
  //     setAvatar(user.avatar);
  //   }
  // }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!avatar) {
      alert("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("image", avatar);

    //pass on to multer and cloudinary
    handleUpdateProfile(formData);
  };

  const handlePfpChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };

    setAvatar(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <div
        style={{ maxWidth: "480px" }}
        className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
      >
        <form onSubmit={submitHandler}>
          <h2 className="mb-5 text-2xl font-semibold">Update Profile</h2>

          <div className="mb-4">
            <label className="block mb-1"> Full Name </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Update your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1"> Email </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Update your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1"> Avatar </label>
            <div className="mb-4 flex flex-col md:flex-row">
              <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer md:w-1/5 lg:w-1/4">
                <img
                  className="w-21 h-14 rounded-full border-blue-500"
                  src={avatarPreview}
                />
              </div>
              <div className="md:w-2/3 lg:w-80 ml-3">
                <input
                  className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-6"
                  type="file"
                  id="formFile"
                  onChange={handlePfpChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            //disabled={loading ? true : false}
          >
            {/* {loading ? "Updating..." : "Update"} */}
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
