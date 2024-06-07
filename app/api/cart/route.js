export const dynamic = "force-dynamic";

import dbConnect from "@/lib/config/ConnectDB";
import { getCartSessionData } from "@/lib/helpers/getSessionData";
import Cart from "@/lib/models/Cart";

export const PUT = async (req) => {
  try {
    await dbConnect();
    const cartSessionData = await getCartSessionData();

    const { cartData } = await req.json();

    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    const cartFound = await Cart.findOne({
      userId: userId,
    });
    if (!cartFound) {
      return Response.json({ message: "Cart not found" });
    }
    if (cartFound.items.length == 10) {
      return Response.json({
        message: "Cannot have more than 10 items in cart",
      });
    }

    await Cart.findByIdAndUpdate(cartFound, { items: cartData });
    cartSessionData.cart = cartData;
    await cartSessionData.save();

    return Response.json({ message: "updated cart" });
  } catch (error) {
    return { error: error.message }, { status: 400 };
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
    return Response.json({ error: error.message }, { status: 400 });
  }
};
