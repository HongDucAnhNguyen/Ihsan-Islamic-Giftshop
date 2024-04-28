import React from "react";

import { searchProducts } from "../../backend/controllers/ProductControllers";
import ProductsList from "@/components/products/ProductsList";

const page = async (req) => {
  const searchResults = await searchProducts(req.searchParams);

  return (
    <div>
      {searchResults && searchResults.length > 0 ? (
        <div>
          <h1 className="mt-5 text-center">
            {searchResults.length} {"result(s)"} found
          </h1>
          <ProductsList data={searchResults}></ProductsList>
        </div>
      ) : (
        <h1 className="mt-5 text-center">No results found</h1>
      )}
    </div>
  );
};

export default page;
