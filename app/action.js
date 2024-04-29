"use server";
export const getProducts = async (searchParams) => {
  try {
    const currentPage = Number(searchParams?.page) || 1;

    const response = await fetch(
      `${process.env.BASE_URL}/api/products?page=${currentPage}`,
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
