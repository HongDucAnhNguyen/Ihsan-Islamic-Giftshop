import ProductsList from "@/components/products/ProductsList";

const searchProducts = async (searchParams) => {
  try {
    const keywordFilter = searchParams.query;
    const currentPage = searchParams.page || 1;
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
    return error
  }
};

const page = async (req) => {
  const { searchResults, nextPageLink, prevPageLink } = await searchProducts(
    req.searchParams
  );

  return (
    <div>
      {searchResults ? (
        <div>
          <h1 className="mt-5 text-center">
            {searchResults.length} {"result(s)"} found
          </h1>
          <ProductsList
            data={searchResults}
            nextPageLink={nextPageLink}
            prevPageLink={prevPageLink}
          ></ProductsList>
        </div>
      ) : (
        <h1 className="mt-5 text-center">No results found</h1>
      )}
    </div>
  );
};

export default page;
