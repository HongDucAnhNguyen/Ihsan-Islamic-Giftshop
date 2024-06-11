"use client";
import React from "react";
import ProductItem from "./ProductItem";
import Filters from "../shared-components/Filters";
import Link from "next/link";
import { usePathname } from "next/navigation";
const ProductsList = ({ data, nextPageLink, prevPageLink }) => {
  const pathname = usePathname();
  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex justify-center flex-col md:flex-row -mx-4">
          {pathname !== "/search" && <Filters></Filters>}
          <main className="md:2-2/3 lg:w-3/4 px-3">
            {data?.length > 0 ? (
              data.map((product) => (
                <ProductItem key={product._id} product={product}></ProductItem>
              ))
            ) : (
              <h3 className="text-2xl font-bold">
                We could not find any products
              </h3>
            )}
          </main>
        </div>
        {data?.length > 0 && (
          <div>
            <div className="flex justify-center gap-5">
              <Link
                href={prevPageLink}
                className="bg-lime-700 text-white rounded-md p-2"
              >
                Prev Page
              </Link>

              <Link
                href={nextPageLink}
                className="bg-lime-700 text-white rounded-md p-2"
              >
                Next Page
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsList;
