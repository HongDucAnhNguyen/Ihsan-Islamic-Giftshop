import HeroSection from "@/components/Homepage/HeroSection";
import ProductsList from "../components/products/ProductsList";

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
    return {
      allProducts: data.products,
      nextPageLink: data.nextPageLink,
      prevPageLink: data.prevPageLink,
    };
  } catch (error) {
    return error;
  }
};

export default async function Home({ searchParams }) {
  const { allProducts, nextPageLink, prevPageLink } = await getProducts(
    searchParams
  );

  return (
    <main>
      <HeroSection></HeroSection>
      {allProducts && (
        <ProductsList
          data={allProducts}
          nextPageLink={nextPageLink}
          prevPageLink={prevPageLink}
        ></ProductsList>
      )}
    </main>
  );
}
