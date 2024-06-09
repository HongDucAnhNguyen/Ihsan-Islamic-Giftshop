import dbConnect from "@/lib/config/ConnectDB";
import { getAccountSessionData } from "@/lib/helpers/getSessionData";

import { Product } from "@/lib/models/Product";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();

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
