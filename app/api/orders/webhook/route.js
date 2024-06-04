import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const rawBody = await req.text();
  const signature = headers().get("Stripe-Signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log("your error seems to be: ", error.message);
    return NextResponse.json(
      { error: "Webhook signature verification failed." },
      { status: 400 }
    );
  }

  const session = event.data.object;
  // // Handle the event
  // switch (event.type) {
  //   case "checkout.session.completed":
  //     console.log("Session:", session); // Debugging log

  //     try {
  //       const line_items = await stripe.checkout.sessions.listLineItems(
  //         event.data.object.id
  //       );
  //       console.log("Line Items:", line_items); // Debugging log
  //     } catch (err) {
  //       console.error("Error fetching line items:", err.message); // Error log
  //     }
  //     break;

  //   default:
  //     break;
  // }
  return NextResponse.json({ paid: true });
}
