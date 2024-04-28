export const dynamic = "force-dynamic";

import Product from "@/backend/models/Product";

export async function GET(req) {
  try {
    // const { searchParams } = new URL(req.url);
    // const currentPage = searchParams.get("page") || 1;
    // const skipHowMany = 3 * (currentPage - 1);
    const allProducts = await Product.find();
    console.log("you received this data", allProducts)
    return Response.json({ products: allProducts });
  } catch (error) {
    return Response.json(error);
  }
}

// export const POST = async (req) => {
//   try {
//     const data = await req.json();
//     const newProduct = await Product.create(data);
//     return Response.json(newProduct);
//   } catch (error) {
//     return Response.json(error);
//   }
// };
