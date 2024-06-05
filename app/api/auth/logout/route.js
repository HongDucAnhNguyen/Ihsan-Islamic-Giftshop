import {
  getAccountSessionData,
  getCartSessionData,
  getCheckoutSessionData,
} from "@/backend/helpers/getSessionData";

import { NextResponse } from "next/server";

export const GET = async (req) => {
  const accountSession = await getAccountSessionData();
  const cartSession = await getCartSessionData();
  const checkoutSession = await getCheckoutSessionData();

  accountSession.destroy();
  cartSession.destroy();
  checkoutSession.destroy();

  return NextResponse.redirect(new URL("/", req.url));
};
