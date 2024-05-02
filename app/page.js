import ProductsList from "../components/products/ProductsList";

const getProducts = async (searchParams) => {
  try {
    // let fetchURL = `${process.env.BASE_URL}/api/products`;
    const currentPage = Number(searchParams?.page) || 1;
    const categoryFilter = searchParams?.category || "none";
    const ratingsFilter = searchParams?.ratings || "none";
    const minPrice = searchParams?.min || "none";
    const maxPrice = searchParams?.max || "none";

    const response = await fetch(
      `${process.env.BASE_URL}/api/products?category=${categoryFilter}&ratings=${ratingsFilter}&min=${minPrice}&max=${maxPrice}&page=${currentPage}`,
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
