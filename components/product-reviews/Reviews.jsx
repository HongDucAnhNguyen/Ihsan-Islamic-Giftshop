"use client";
import { ReviewContext } from "@/lib/context/reviewscontext-provider";
import Image from "next/image";
import { useContext } from "react";
import StarRatings from "react-star-ratings";

const Reviews = ({ reviews, productId }) => {
  const { handleDeleteReview } = useContext(ReviewContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviews?.map((review) => (
        <article
          key={review?._id}
          className="block p-6 bg-white max-w-sm rounded-lg border border-gray-200 shadow-md mb-5"
        >
          <div className="flex items-center mb-4 space-x-4">
            <Image
              src={
                review?.user?.avatar
                  ? review?.user?.avatar?.url
                  : "/images/default_avatar.png"
              }
              height="40"
              width="40"
              alt="User avatar"
            />

            <div className="space-y-1 font-medium">
              <p>
                {review?.user?.name}
                <time className="block text-sm text-gray-500 dark:text-gray-400">
                  Posted on: {review?.createdAt?.substring(0, 10)}
                </time>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center space-x-2 mb-2">
            <div className="ratings">
              <StarRatings
                rating={review?.rating || 0}
                starRatedColor="#ffb829"
                numberOfStars={5}
                starDimension="18px"
                starSpacing="1px"
                name="rating"
              />
            </div>
            <span className="text-yellow-500">{review?.rating}</span>
          </div>

          <p className="mb-2 font-light text-gray-500 dark:text-gray-400 text-lg">
            {review?.comment}
          </p>
          {review?.canManage === true && (
            <div className="flex flex-wrap items-center space-x-2 mb-2">
              <a
                className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                href={`/reviews/${review._id}?productId=${productId}`}
              >
                <button>Edit</button>
              </a>
              <button
                onClick={() => handleDeleteReview(review._id, productId)}
                className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
              >
                Delete
              </button>
            </div>
          )}
        </article>
      ))}
    </div>
  );
};

export default Reviews;
