import HeroSection from "@/components/Homepage/HeroSection";
import ProductsList from "../components/products/ProductsList";

const getProducts = async (req) => {
  try {
    let currentPage = parseInt(req.searchParams.page || "1");
    console.log(currentPage);

    const response = await fetch(
      `${process.env.BASE_URL}/api/products?page=${currentPage}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    return data.products;
  } catch (error) {
    return error;
  }
};

export default async function Home(req) {
  const allProducts = await getProducts(req);

  return (
    <main>
      <HeroSection></HeroSection>
      {allProducts ? (
        <ProductsList data={allProducts}></ProductsList>
      ) : (
        <h1>There is no data</h1>
      )}
    </main>
  );
}
