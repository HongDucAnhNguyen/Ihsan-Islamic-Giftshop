export const dynamic = "force-dynamic";

import dbConnect from "@/lib/config/ConnectDB";
import { Product } from "@/lib/models/Product";
export const GET = async (req, context) => {
  try {
    await dbConnect();
    const { params } = context;
    const { productId } = params;

    const productDetails = await Product.findById(productId);
    return Response.json(productDetails);
  } catch (error) {
    return Response.json(error);
  }
};
