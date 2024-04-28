export const getProducts = async (req) => {
  let currentPage = parseInt(req.searchParams.page);
  if (req.searchParams.page == undefined) {
    currentPage = 1;
  }

  const response = await fetch(
    `${process.env.BASE_URL}/api/products?page=${currentPage}`
  );
  const data = await response.json();

  return data.products;
};

export const getProductDetails = async (productId) => {
  const response = await fetch(
    `${process.env.BASE_URL}/api/products/${productId}`
  );
  const data = await response.json();
  return data;
};

export const searchProducts = async (searchParams) => {
  const keywordFilter = searchParams.query;
  const response = await fetch(
    `${process.env.BASE_URL}/api/products/search?query=${keywordFilter}`
  );
  const data = await response.json();
  return data.searchResults;
};
