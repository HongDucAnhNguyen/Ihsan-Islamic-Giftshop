export const getProducts = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/products/`);
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
