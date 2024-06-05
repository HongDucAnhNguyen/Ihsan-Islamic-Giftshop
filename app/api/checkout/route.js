import {
  getAccountSessionData,
  getCartSessionData,
} from "@/backend/helpers/getSessionData";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const POST = async (req) => {
  try {
    //get products to checkout
    const { shippingInfo, checkoutItems } = await req.json();
    const { userEmail, userId } = await getAccountSessionData();

    if (!userEmail || !userId) {
      return Response.json(
        { error: "You have to login to checkout" },
        { status: 401 }
      );
    }

    const checkout_line_items = checkoutItems?.map((item) => {
      return {
        price_data: {
          //specify currency used
          currency: "cad",
          //unit info
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: { productId: item.productId },
          },
          //pricing of unit in cents
          unit_amount: item.price * 100,
        },
        tax_rates: ["txr_1PLWKPGpf7AVBE7P7zRNvoT4"],
        quantity: item.quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.BASE_URL}/profile/orders`,
      cancel_url: `${process.env.BASE_URL}/cart`,
      customer_email: userEmail,
      client_reference_id: userId,
      mode: "payment",
      metadata: { shippingInfo },
      shipping_options: [
        {
          shipping_rate: "shr_1PLVhHGpf7AVBE7PVJUohiwq",
        },
      ],

      line_items: checkout_line_items,
    });
    return Response.json(session);
  } catch (error) {
    return Response.json(error);
  }
};
