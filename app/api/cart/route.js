export const dynamic = "force-dynamic";

import dbConnect from "@/backend/config/ConnectDB";
import Cart from "@/backend/models/Cart";

export const PUT = async (req) => {
  try {
    await dbConnect();

    const cartData = await req.json();
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    await Cart.findOneAndUpdate({
      userId: userId,
      items: cartData,
    });
    return Response.json({ message: "updated cart" });
  } catch (error) {
    return Response.json(error.message);
  }
};

export const GET = async (req) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    const cartData = await Cart.findOne({ userId: userId });
    return Response.json({ items: cartData?.items });
  } catch (error) {
    return Response.json(error.message);
  }
};
