"use server";
import { getIronSession } from "iron-session";
import {
  accountSessionOptions,
  cartSessionOptions,
  checkoutSessionOptions,
} from "../config/sessionOptionsConfig";
import { cookies } from "next/headers";

export const getAccountSessionData = async () => {
  const session = await getIronSession(cookies(), accountSessionOptions);
  return session;
};

export const getCartSessionData = async () => {
  const session = await getIronSession(cookies(), cartSessionOptions);

  return session;
};

export const getCheckoutSessionData = async () => {
  const session = await getIronSession(cookies(), checkoutSessionOptions);
  return session;
};
