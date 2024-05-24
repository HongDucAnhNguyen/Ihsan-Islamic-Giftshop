export const dynamic = "force-dynamic";

import dbConnect from "@/backend/config/ConnectDB";
import { Product } from "@/backend/models/Product";
export const GET = async (req, { params }) => {
  try {
    await dbConnect();
    const { productId } = params;

    const productDetails = await Product.findById(productId);
    return Response.json(productDetails);
  } catch (error) {
    return Response.json(error);
  }
};

export const PUT = async (req, { params }) => {
  try {
    await dbConnect();

    const data = await req.json();

    const { productId } = params;
    console.log(productId);

    const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
      new: true,
    });
    return Response.json({ updatedProduct });
  } catch (error) {
    return Response.json(error);
  }
};
export const DELETE = async (req, { params }) => {
  try {
    await dbConnect();

    const { productId } = params;
    console.log(productId);
    await Product.findByIdAndDelete(productId);
    return Response.json({ message: "deleted product" });
  } catch (error) {
    return Response.json(error);
  }
};
