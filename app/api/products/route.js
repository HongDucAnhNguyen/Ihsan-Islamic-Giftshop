export const dynamic = "force-dynamic";

import Product from "@/backend/models/Product";

export const GET = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const currentPage = searchParams.get("page") || 1;
    const skipHowMany = 3 * (currentPage - 1);
    const allProducts = await Product.find();
    return Response.json({ products: allProducts });
  } catch (error) {
    return Response.json(error);
  }
};

export const POST = async (req) => {
  try {
    const data = await req.json();
    const newProduct = await Product.create(data);
    return Response.json(newProduct);
  } catch (error) {
    return Response.json(error);
  }
};
