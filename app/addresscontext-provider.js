"use client";

import { useRouter } from "next/navigation";
import { createContext } from "react";

export const AddressContext = createContext({});

export default function AddressContextProvider({ children }) {
  const router = useRouter();
  const handleAddNewAddress = async (addressData) => {
    try {
      const response = await fetch("/api/address", {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(addressData),
      });
      const data = await response.json();
      if (data?.newShippingAddress) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {}
  };

  const handleUpdateAddress = async (addressId, updateData) => {
    try {
      const response = await fetch(`/api/address/${addressId}`, {
        method: "PUT",

        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      if (data?.updateSuccess == true) {
        router.push("/profile");
        router.refresh();
      } else {
        //toastify here
      }
    } catch (error) {}
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await fetch(`/api/address/${addressId}`, {
        method: "DELETE",
      });
      router.push("/profile");
      router.refresh();
    } catch (error) {}
  };

  return (
    <AddressContext.Provider
      value={{ handleAddNewAddress, handleUpdateAddress, handleDeleteAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
}
