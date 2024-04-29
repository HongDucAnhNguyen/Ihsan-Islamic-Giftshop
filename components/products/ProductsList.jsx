"use client";
import React from "react";
import ProductItem from "./ProductItem";
import Filters from "../utilities/Filters";
import { useRouter } from "next/router";
const ProductsList = ({ data, nextPageLink, prevPageLink }) => {
  const router = useRouter();
  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Filters></Filters>
          <main className="md:2-2/3 lg:w-3/4 px-3">
            {data?.length >= 1 &&
              data.map((product) => (
                <ProductItem key={product?._id} product={product}></ProductItem>
              ))}
          </main>
        </div>
        <div>
          <div className="flex justify-center gap-5">
            <button
              onClick={() => {
                router.push(prevPageLink);
              }}
              className="bg-blue-500 text-white rounded-md p-2"
            >
              prev. page
            </button>

            <button
              onClick={() => {
                router.push(nextPageLink);
              }}
              className="bg-blue-500 text-white rounded-md p-2"
            >
              next page
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsList;
