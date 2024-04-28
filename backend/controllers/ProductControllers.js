"use server";

export const getProducts = async (req) => {
  try {
    let currentPage = parseInt(req.searchParams.page);

    const response = await fetch(
      `${process.env.BASE_URL}/api/products?page=${currentPage}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    return data.products;
  } catch (error) {
    return error;
  }
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
