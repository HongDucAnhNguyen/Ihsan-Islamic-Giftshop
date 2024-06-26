"use client";
import React, { useContext, useState } from "react";
import StarRatings from "react-star-ratings";
import BreadCrumbs from "../shared-components/BreadCrumbs";
import { cartContext } from "@/lib/context/cartcontext-provider";
import { toast } from "react-toastify";
import Reviews from "../product-reviews/Reviews";
import Link from "next/link";

const ProductDetails = ({ data }) => {
  const { handleAddItemToCart, cart } = useContext(cartContext);
  const handleAddToCart = () => {
    if (cart?.cartItems?.find((item) => item.productId === data._id)) {
      toast.info("you have already added this item to cart");
      return;
    }
    handleAddItemToCart({
      productId: data._id,
      name: data.name,
      price: data.price,
      image: data?.images[0]?.url || "/images/default_ product.png",
      stock: data.stock,
      quantity: 1,
    });
  };

  const [imgPreview, setImgPreview] = useState(
    data?.images?.length > 0
      ? data?.images[0].url
      : "/images/default_product.png"
  );
  const handleChangeFocusImg = (imgUrl) => {
    setImgPreview(imgUrl);
  };
  const breadCrumbs = [
    { name: "Home", url: "/" },
    {
      name: `${data?.name?.substring(0, 30)}...`,
      url: `/product/${data?._id}`,
    },
  ];
  const ProductInStock = data?.stock >= 1;
  return (
    <main>
      <BreadCrumbs breadCrumbs={breadCrumbs}></BreadCrumbs>
      <section className="bg-white py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
            <aside>
              <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
                <img
                  className="object-cover inline-block"
                  src={imgPreview}
                  alt="Product title"
                  width="340"
                  height="340"
                />
              </div>
              <div className="space-x-2 overflow-auto text-center whitespace-nowrap">
                {data?.images?.map((image, index) => (
                  <a
                    key={index}
                    className="inline-block border border-gray-200 p-1 rounded-md hover:border-green-500 cursor-pointer"
                    onClick={() => {
                      handleChangeFocusImg(image.url);
                    }}
                  >
                    <img
                      className="w-14 h-14"
                      src={image.url}
                      alt="Product title"
                      width="500"
                      height="500"
                    />
                  </a>
                ))}
              </div>
            </aside>
            <main>
              <h2 className="font-semibold text-2xl mb-4">{data.name}</h2>

              <div className="flex flex-wrap items-center space-x-2 mb-2">
                <div className="ratings">
                  <StarRatings
                    rating={data.ratings || 0}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                </div>
                <span className="text-yellow-500">{data.ratings}</span>

                <svg
                  width="6px"
                  height="6px"
                  viewBox="0 0 6 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                </svg>

                <span className="text-green-500">Verified</span>
              </div>

              <p className="mb-4 font-semibold text-xl">${data.price}</p>

              <p className="mb-4 text-gray-500">{data.description}</p>

              {ProductInStock && (
                <div className="flex flex-wrap gap-2 mb-5">
                  <button
                    className="px-4 py-2 inline-block text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
                    onClick={handleAddToCart}
                  >
                    <i className="fa fa-shopping-cart mr-2"></i>
                    Add to cart
                  </button>
                </div>
              )}

              <ul className="mb-5">
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Stock</b>
                  <span
                    className={
                      ProductInStock ? "text-green-500" : "text-red-500"
                    }
                  >
                    {ProductInStock ? "In Stock" : "Sold Out"}
                  </span>
                </li>
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Category:</b>
                  <span className="text-gray-500">{data.category}</span>
                </li>
              </ul>
            </main>
          </div>

          <hr />

          <div className="font-semibold">
            <h1 className="text-gray-500 review-title mb-6 mt-10 text-2xl">
              Other Customers Reviews
            </h1>
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                <Link
                  className="px-4 py-2 inline-block text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
                  href={`/reviews/new/${data._id}`}
                >
                  {/* <i className="fa fa-shopping-cart mr-2"></i> */}
                  Write a review
                </Link>
              </div>
            </div>
            <Reviews productId={data?._id} reviews={data?.reviews} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
