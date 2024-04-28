export const dynamic = "force-dynamic";

import dbConnect from "@/backend/config/ConnectDB";
import { NextResponse } from "next/server";
import { Product } from "@/backend/models/Product";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const skipHowMany = 3 * (currentPage - 1);
    const allProducts = await Product.find().skip(skipHowMany).limit(3);

    console.log(allProducts);
    return NextResponse.json({ products: allProducts });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export const POST = async (req) => {
  try {
    const data = await req.json();
    const newProduct = await Product.create(data);
    return Response.json(newProduct);
  } catch (error) {
    return Response.json(error);
  }
};
