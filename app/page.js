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
      <section
        className="bg-gray-900 text-white py-44"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="container mx-auto flex flex-col items-center justify-center relative
        
        "
        >
          {/* Overlay for better readability */}
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center z-10">
            Welcome to Ihsan
          </h1>
          <p
            className="text-lg md:text-xl mb-12 text-center z-10"
            style={{ maxWidth: 500 }}
          >
            We stay true to our name. Discover excellence, experience elegance,
            find tranquility.
          </p>
          <button className="bg-lime-600 hover:bg-lime-700 text-white px-6 py-3 rounded-md text-lg font-semibold transition duration-300 z-10">
            Shop Now
          </button>
        </div>
      </section>

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
