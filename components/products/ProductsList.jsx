import React from "react";
import ProductItem from "./ProductItem";
import Filters from "../utilities/Filters";
const ProductsList = ({ data }) => {
  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          {/**add filters component here for easy category and pricing navigation */}
          <Filters></Filters>
          <main className="md:2-2/3 lg:w-3/4 px-3">
            {data &&
              data.map((product) => (
                <ProductItem key={product?._id} product={product}></ProductItem>
              ))}
          </main>
        </div>
      </div>
    </section>
  );
};

export default ProductsList;
