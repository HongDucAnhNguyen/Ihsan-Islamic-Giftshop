import dbConnect from "@/lib/config/ConnectDB";

import { Product } from "@/lib/models/Product";

export const GET = async () => {
  try {
    await dbConnect();

    const allProducts = await Product.find();

    return Response.json({ products: allProducts });
  } catch (error) {
    return Response.json({ error: error.message });
  }
};
