import dbConnect from "@/backend/config/ConnectDB";
import { extractOrderItems } from "@/backend/helpers/stripeWebhookHelper";
import Order from "@/backend/models/Order";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    await dbConnect();
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
        //500 // Default tolerance in seconds, can be adjusted if needed
      );
    } catch (error) {
      console.error("Error constructing event:", error.message); // Error log
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      try {
        const session = event.data.object;
        const line_items = await stripe.checkout.sessions.listLineItems(
          event.data.object.id
        );

        const orderItems = await extractOrderItems(line_items);

        const userId = session.client_reference_id;
        //convert to dollars from cents
        const amountPaid = session.amount_total / 100;
        const taxPaid = session.total_details.amount_tax / 100;

        const paymentInfo = {
          stripePaymentId: session.paymenst_intent,
          status: session.payment_status,
          amountPaid: amountPaid,
          taxPaid: taxPaid,
        };

        const orderData = {
          userId: userId,
          shippingInfo: session.metadata.shippingInfo,
          paymentInfo,
          orderItems,
        };

        const newOrder = await Order.create(orderData);
        console.log(newOrder);
        return Response.json({ orderPlaced: true }, { status: 200 });
      } catch (err) {
        console.error("Error fetching line items:", err.message); // Error log
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.log("Webhook processing failed.", err.message); // Error log
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
