"use client";
import React, { useContext, useState } from "react";
import StarRatings from "react-star-ratings";
import { ReviewContext } from "@/lib/context/reviewscontext-provider";
const UpdateReview = ({ review, productId }) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const { handleUpdateReview } = useContext(ReviewContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const updateData = { rating, comment };
    handleUpdateReview(review._id, updateData, productId);
  };

  return (
    <form onSubmit={submitHandler}>
      <h1 className="text-gray-500 review-title my-5 text-2xl">
        Update Your Review
      </h1>

      <h3>Select rating</h3>
      <div className="mb-4 mt-3">
        <div className="ratings">
          <StarRatings
            rating={rating || 0}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            changeRating={(e) => setRating(e)}
          />
        </div>
      </div>
      <div className="mb-4 mt-5">
        <label className="block mb-1"> Comments </label>
        <textarea
          rows="4"
          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full h-3/4"
          placeholder="Your review"
          name="description"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="mt-3 mb-5 px-4 py-2 text-center inline-block text-white bg-lime-500 border border-transparent rounded-md hover:bg-lime-600 w-full"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateReview;
