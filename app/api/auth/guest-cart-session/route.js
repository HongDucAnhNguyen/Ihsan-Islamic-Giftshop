
import { getCartSessionData } from "@/backend/helpers/getSessionData";


export const GET = async () => {
  try {
    const cartSessionData = await getCartSessionData();


    return Response.json({ sessionData: cartSessionData });
  } catch (error) {
    return Response.json(error.message);
  }
};

export const POST = async (req) => {
  try {
    const cartSessionData = await getCartSessionData();
    const cartData = await req.json();
    cartSessionData.cart = cartData;
    await cartSessionData.save();

    return Response.json({ sessionData: cartSessionData });
  } catch (error) {
    return Response.json(error.message);
  }
};
