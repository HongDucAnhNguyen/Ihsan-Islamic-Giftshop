"use client";
import React from "react";
import ProductItem from "./ProductItem";
import Filters from "../utilities/Filters";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProductsList = ({ data, currentPage, maxPages, searchQuery }) => {
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
                if (parseInt(currentPage) > 1) {
                  if (searchQuery) {
                    const page = parseInt(currentPage) - 1;
                    router.push(`?query=${searchQuery}&page=${page}`);
                  } else {
                    const page = parseInt(currentPage) - 1;
                    router.push(`?page=${page}`);
                  }
                }
              }}
              className="bg-blue-500 text-white rounded-md p-2"
            >
              prev. page
            </button>

            <button
              onClick={() => {
                if (parseInt(currentPage) < parseInt(maxPages)) {
                  if (searchQuery) {
                    const page = parseInt(currentPage) + 1;
                    router.push(`?query=${searchQuery}&page=${page}`);
                  } else {
                    const page = parseInt(currentPage) + 1;
                    router.push(`?page=${page}`);
                  }
                }
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
