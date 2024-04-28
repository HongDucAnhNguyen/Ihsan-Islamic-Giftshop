"use client";
import React from "react";
import ProductItem from "./ProductItem";
import Filters from "../utilities/Filters";
import { useRouter } from "next/navigation";
const ProductsList = ({ data, currentPage, maxPages }) => {
  const router = useRouter();
  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          {/**add filters component here for easy category and pricing navigation */}
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
                if (currentPage > 1) {
                  const page = currentPage - 1;
                  router.push(`?page=${page}`);
                }
              }}
              className="bg-blue-500 text-white rounded-md p-2"
            >
              previous page
            </button>
            <button
              className="bg-blue-500 text-white rounded-md p-2"
              onClick={() => {
                if (currentPage < maxPages) {
                  console.log(maxPages);
                  const page = currentPage + 1;
                  router.push(`?page=${page}`);
                }
              }}
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
