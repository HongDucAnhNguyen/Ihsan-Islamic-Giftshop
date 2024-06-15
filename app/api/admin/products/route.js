export const dynamic = "force-dynamic";

import dbConnect from "@/lib/config/ConnectDB";
import { getAccountSessionData } from "@/lib/helpers/getSessionData";

import { Product } from "@/lib/models/Product";
import User from "@/lib/models/User";
import { headers } from "next/headers";

export const GET = async (req) => {
  try {
    await dbConnect();
    console.log(headers().get("x-is-admin"));
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    const userFound = await User.findById(userId);

    if (!userFound) {
      return Response.json({ error: "Unauthorized request" }, { status: 401 });
    }
    if (userFound?.role !== process.env.ADMIN_ROLE) {
      return Response.json({ error: "Unauthorized request" }, { status: 401 });
    }

    const allProducts = await Product.find();
    return Response.json({ products: allProducts });
  } catch (error) {
    return Response.json({ error: error.message });
  }
};

export const POST = async (req) => {
  try {
    await dbConnect();
    const { userRole } = await getAccountSessionData();

    if (userRole !== process.env.ADMIN_ROLE) {
      return Response.json({ error: "Unauthorized action" }, { status: 401 });
    }
    const newProductData = await req.json();

    const newProduct = await Product.create(newProductData);

    if (!newProduct) {
      return Response.json({ error: "Failed to create product" });
    }
    return Response.json({ createdProduct: null });
  } catch (error) {
    return Response.json({ error: error.message });
  }
};
