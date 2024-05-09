"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
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
      }
    } catch (error) {
      setError("an error occurred while registering");
    }
  };

  const handleLogoutUser = async () => {
    try {
      //client component does not expose private envs
      await fetch("/api/auth/logout", {
        method: "GET",
      });
    } catch (error) {
      setError("an error occurred while logging out");
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
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        // setUser,
        handleRegisterUser,
        handleLoginUser,
        handleLogoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
