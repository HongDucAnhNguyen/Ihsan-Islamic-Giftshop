"use client";

import { useRouter } from "next/navigation";
import { createContext } from "react";
import { toast } from "react-toastify";

export const ReviewContext = createContext();
export default function ReviewContextProvider({ children }) {
  const router = useRouter();
  const contextwrapped = "hello";

  const handlePostReview = async (productId, newReviewData) => {
    try {
      const response = await fetch(`/api/reviews/${productId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReviewData),
      });
      const data = await response.json();
      if (data?.reviewPosted === true) {
        toast.success(data.message);
        router.push(`/product/${productId}`);
        router.refresh();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        handlePostReview,
        contextwrapped,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}
