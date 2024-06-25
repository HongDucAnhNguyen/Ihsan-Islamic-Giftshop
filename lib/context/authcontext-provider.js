"use client";

import { useRouter } from "next/navigation";
import { createContext } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const router = useRouter();

  const handleLoginUser = async ({ name, email, password }) => {
    try {
      //client component does not expose private envs
      const response = await fetch(`/api/auth/login`, {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (data?.authenticated == true) {
        router.push("/");
        router.refresh();
        toast.success(data?.message);
      } else {
        toast.warning(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogoutUser = async () => {
    try {
      //client component does not expose private envs
      await fetch("/api/auth/logout", {
        method: "GET",
      });
    } catch (error) {
      toast.error("Error logging you out");
    }
  };

  const handleRegisterUser = async ({ name, email, password }) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (data?.authenticated == true) {
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      toast.error("an error occurred while registering");
    }
  };

  const handleUpdateProfile = async (formData) => {
    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "POST",

        body: formData,
      });
      const data = await response.json();
      if (data?.profileUpdated == true) {
        router.push("/profile");
        router.refresh();
      }
    } catch (error) {
      toast.error("Error updating your profile");
    }
  };

  const handleUpdatePassword = async ({ currentPassword, newPassword }) => {
    try {
      const response = await fetch(`/api/auth/update-password`, {
        method: "PUT",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();
      if (data?.passwordUpdated == true) {
        await fetch("/api/auth/logout");
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      toast.error("Error updating password");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleRegisterUser,
        handleLoginUser,
        handleLogoutUser,
        handleUpdateProfile,
        handleUpdatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
