import { getProductDetails } from "@/backend/controllers/productControllers";
import ProductDetails from "@/components/products/ProductDetails";
import React from "react";

const page = async ({ params }) => {
  const productDetails = await getProductDetails(params.productId);

  return (
    <main>
      <ProductDetails data={productDetails}></ProductDetails>
    </main>
  );
};

export default page;
