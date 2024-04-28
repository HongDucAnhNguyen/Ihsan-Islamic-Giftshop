"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ProductItem from "./ProductItem";
import Filters from "../utilities/Filters";
import Link from "next/link";
const ProductsList = ({ data, currentPage, maxPages }) => {
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
            <Link
              href={`?page=${currentPage > 1 ? currentPage - 1 : currentPage}`}
            >
              {" "}
              <button className="bg-blue-500 text-white rounded-md p-2">
                prev. page
              </button>
            </Link>
            <Link
              href={`?page=${
                currentPage < maxPages ? currentPage + 1 : currentPage
              }`}
            >
              {" "}
              <button className="bg-blue-500 text-white rounded-md p-2">
                next page
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsList;
