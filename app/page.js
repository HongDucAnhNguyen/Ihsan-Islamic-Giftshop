import HeroSection from "@/components/Homepage/HeroSection";
import ProductsList from "../components/products/ProductsList";

const getProducts = async (searchParams) => {
  try {
    let fetchURL = `${process.env.BASE_URL}/api/products`;
    const currentPage = Number(searchParams?.page) || 1;
    const categoryFilter = searchParams?.category;
    const ratingsGTE = searchParams?.ratings;
    if (categoryFilter && ratingsGTE) {
      fetchURL += `?category=${categoryFilter}&ratings=${ratingsGTE}&page=${currentPage}`;
    } else {
      if (ratingsGTE) {
        fetchURL += `?ratings=${ratingsGTE}&page=${currentPage}`;
      } else {
        if (categoryFilter) {
          fetchURL += `?category=${categoryFilter}&page=${currentPage}`;
        } else {
          fetchURL += `?page=${currentPage}`;
        }
      }
    }

    const response = await fetch(fetchURL, {
      method: "GET",
    });
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
