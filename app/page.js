import HeroSection from "@/components/Homepage/HeroSection";
import ProductsList from "../components/products/ProductsList";

const getProducts = async (req) => {
  try {
    let currentPage = parseInt(req.searchParams.page || "1");

    const response = await fetch(
      `${process.env.BASE_URL}/api/products?page=${currentPage}`
    );
    const data = await response.json();

    return {
      allProducts: data.products,
      currentPage: currentPage,
      maxPages: data.maxPages,
    };
  } catch (error) {
    return error;
  }
};

export default async function Home(req) {
  const { allProducts, currentPage, maxPages } = await getProducts(req);

  return (
    <main>
      <HeroSection></HeroSection>
      {allProducts ? (
        <ProductsList
          data={allProducts}
          currentPage={currentPage}
          maxPages={maxPages}
        ></ProductsList>
      ) : <h1>BRO</h1>}
    </main>
  );
}
