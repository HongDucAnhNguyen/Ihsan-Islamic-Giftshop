import { getCheckoutSessionData } from "@/lib/helpers/getSessionData";

export const GET = async () => {
  try {
    const checkoutSessionData = await getCheckoutSessionData();

    return Response.json({ sessionData: checkoutSessionData });
  } catch (error) {
    return Response.json(error.message);
  }
};
export const POST = async (req) => {
  try {
    const checkoutSessionData = await getCheckoutSessionData();
    const { amount, tax, totalAmount } = await req.json();
    checkoutSessionData.amount = amount;
    checkoutSessionData.tax = tax;
    checkoutSessionData.totalAmount = totalAmount;
    await checkoutSessionData.save();

    return Response.json({ sessionData: checkoutSessionData });
  } catch (error) {
    return Response.json(error.message);
  }
};
