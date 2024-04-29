import React from "react";
import ProductItem from "./ProductItem";
import Filters from "../utilities/Filters";
const ProductsList = ({ data, nextPageLink, prevPageLink }) => {
  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Filters></Filters>
          <main className="md:2-2/3 lg:w-3/4 px-3">
            {data?.length >= 1 &&
              data.map((product) => (
                // <ProductItem key={product?._id} product={product}></ProductItem>
                <h1>{product?.name}</h1>
              ))}
          </main>
        </div>
        <div>
          <div className="flex justify-center gap-5">
            <div className="bg-blue-500 text-white rounded-md p-2">
              prev. page is {prevPageLink}
            </div>

            <div className="bg-blue-500 text-white rounded-md p-2">
              next page is {nextPageLink}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsList;
