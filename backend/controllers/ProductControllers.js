"use server";

import dbConnect from "../config/ConnectDB";

export const getProducts = async (req) => {
  try {
    await dbConnect();
    let currentPage = parseInt(req.searchParams.page);
    if (req.searchParams.page == undefined) {
      currentPage = 1;
    }

    const response = await fetch(
      `https://api.restful-api.dev/objects?page=${currentPage}`
      // `${process.env.BASE_URL}/api/products?page=${currentPage}`
    );
    const data = await response.json();

    return data.products;
  } catch (error) {
    return error;
  }
};

export const getProductDetails = async (productId) => {
  await dbConnect();

  const response = await fetch(
    `${process.env.BASE_URL}/api/products/${productId}`
  );
  const data = await response.json();
  return data;
};

export const searchProducts = async (searchParams) => {
  await dbConnect();

  const keywordFilter = searchParams.query;
  const response = await fetch(
    `${process.env.BASE_URL}/api/products/search?query=${keywordFilter}`
  );
  const data = await response.json();
  return data.searchResults;
};
