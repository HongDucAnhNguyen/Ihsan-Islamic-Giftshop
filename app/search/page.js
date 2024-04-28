import ProductsList from "@/components/products/ProductsList";

const searchProducts = async (searchParams) => {
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
    maxPages: data.maxPages,
    currentPage: currentPage,
    keywordFilter: keywordFilter
  };
};

const page = async (req) => {
  const { searchResults, maxPages, currentPage, keywordFilter } = await searchProducts(
    req.searchParams
  );

  return (
    <div>
      {searchResults.length > 0 ? (
        <div>
          <h1 className="mt-5 text-center">
            {searchResults.length} {"result(s)"} found
          </h1>
          <ProductsList
            data={searchResults}
            maxPages={maxPages}
            currentPage={currentPage}
            searchQuery={keywordFilter}
          ></ProductsList>
        </div>
      ) : (
        <h1 className="mt-5 text-center">No results found</h1>
      )}
    </div>
  );
};

export default page;
