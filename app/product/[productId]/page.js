import ProductDetails from "@/components/products/ProductDetails";

const getProductDetails = async (productId) => {
  const response = await fetch(
    `${process.env.BASE_URL}/api/products/${productId}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data;
};

const page = async ({ params }) => {
  const productDetails = await getProductDetails(params.productId);

  return (
    <main>
      <ProductDetails data={productDetails}></ProductDetails>
    </main>
  );
};

export default page;
