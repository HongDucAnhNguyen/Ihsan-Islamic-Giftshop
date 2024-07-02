"use client";

import { useRouter } from "next/navigation";
import { createContext } from "react";
import { toast } from "react-toastify";

export const ReviewContext = createContext();
export default function ReviewContextProvider({ children }) {
  const router = useRouter();
  const canReview = true;

  const handlePostReview = async (productId, newReviewData) => {
    try {
      const response = await fetch(`/api/reviews/new/${productId}`, {
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

  const handleUpdateReview = async (reviewId, updateReviewData, productId) => {
    try {
      const response = await fetch(
        `/api/reviews/${reviewId}?productId=${productId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateReviewData),
        }
      );
      const data = await response.json();
      if (data?.reviewUpdated === true) {
        toast.success(data.message);
        router.push(`/reviews/${reviewId}?productId=${productId}`);
        router.refresh();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteReview = async (reviewId, productId) => {
    try {
      const response = await fetch(
        `/api/reviews/${reviewId}?productId=${productId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data?.reviewDeleted === true) {
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
        handleUpdateReview,
        handleDeleteReview,
        canReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}
