export const dynamic = "force-dynamic";
import ProductDetails from "@/components/products/ProductDetails";
import { getAccountSessionData } from "@/lib/helpers/getSessionData";

const getProductDetails = async (productId) => {
  const { userId } = await getAccountSessionData();

  const response = await fetch(
    `${process.env.BASE_URL}/api/products/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userId || {}),
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
