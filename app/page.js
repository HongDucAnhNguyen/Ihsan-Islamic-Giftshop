import HeroSection from "@/components/Homepage/HeroSection";
import ProductsList from "../components/products/ProductsList";
// import { getProducts } from "./action";

const getProducts = async (searchParams) => {
  try {
    const currentPage = Number(searchParams?.page) || 1;

    const response = await fetch(
      `${process.env.BASE_URL}/api/products?page=${currentPage}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default async function Home({ searchParams }) {
  const { products, nextPageLink, prevPageLink } = await getProducts(
    searchParams
  );

  return (
    <main>
      <HeroSection></HeroSection>
      {products && (
        <ProductsList
          data={products}
          nextPageLink={nextPageLink}
          prevPageLink={prevPageLink}
        ></ProductsList>
      )}
    </main>
  );
}
