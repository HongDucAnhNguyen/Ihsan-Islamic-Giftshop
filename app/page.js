import HeroSection from "@/components/Homepage/HeroSection";
import ProductsList from "../components/products/ProductsList";

const getProducts = async (searchParams) => {
  try {
    let currentPage = parseInt(searchParams.page || "1");

    const response = await fetch(
      `${process.env.BASE_URL}/api/products?page=${currentPage}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return {
      allProducts: data.products,
      currentPage: data.currentPage,
      maxPages: data.maxPages,
    };
  } catch (error) {
    return error;
  }
};

export default async function Home(req) {
  const { allProducts, currentPage, maxPages } = await getProducts(
    req.searchParams
  );

  return (
    <main>
      <HeroSection></HeroSection>
      {allProducts && (
        <ProductsList
          data={allProducts}
          currentPage={currentPage}
          maxPages={maxPages}
        ></ProductsList>
      )}
    </main>
  );
}
