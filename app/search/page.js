import ProductsList from "@/components/products/ProductsList";

const searchProducts = async (searchParams) => {
  try {
    const keywordFilter = searchParams?.query;
    const currentPage = Number(searchParams?.page) || 1;
    const response = await fetch(
      `${process.env.BASE_URL}/api/products/search?query=${keywordFilter}&page=${currentPage}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return {
      searchResults: data.searchResults,
      nextPageLink: data.nextPageLink,
      prevPageLink: data.prevPageLink,
    };
  } catch (error) {
    return error;
  }
};

const page = async ({ searchParams }) => {
  const { searchResults, nextPageLink, prevPageLink } = await searchProducts(
    searchParams
  );

  return (
    <div>
      {searchResults && (
        <div>
          <h1 className="mt-5 text-center">
            {searchResults?.length > 0 ? `Results Found` : "No Results found"}
          </h1>
          <ProductsList
            data={searchResults}
            nextPageLink={nextPageLink}
            prevPageLink={prevPageLink}
          ></ProductsList>
        </div>
      )}
    </div>
  );
};

export default page;
