import { cartSessionOptions } from "@/backend/config/sessionOptionsConfig";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    const session = await getIronSession(cookies(), cartSessionOptions);
    return Response.json({ sessionData: session });
  } catch (error) {
    return Response.json(error.message);
  }
};

export const POST = async (req) => {
  try {
    const session = await getIronSession(cookies(), cartSessionOptions);
    const cartData = await req.json();
    session.cart = cartData;
    await session.save();

    return Response.json({ sessionData: session });
  } catch (error) {
    return Response.json(error.message);
  }
};
