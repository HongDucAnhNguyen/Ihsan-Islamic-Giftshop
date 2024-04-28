
import ProductsList from "@/components/products/ProductsList";

const searchProducts = async (searchParams) => {
  const keywordFilter = searchParams.query;
  const response = await fetch(
    `${process.env.BASE_URL}/api/products/search?query=${keywordFilter}`
  );
  const data = await response.json();
  return data.searchResults;
};

const page = async (req) => {
  const searchResults = await searchProducts(req.searchParams);

  return (
    <div>
      {searchResults.length > 0 ? (
        <div>
          <h1 className="mt-5 text-center">
            {searchResults.length} {"result(s)"} found
          </h1>
          <ProductsList data={searchResults}></ProductsList>
        </div>
      ) : (
        <h1 className="mt-5 text-center">No results found</h1>
      )}
    </div>
  );
};

export default page;
