// "use server";
import { getIronSession } from "iron-session";
import {
  accountSessionOptions,
  cartSessionOptions,
  checkoutSessionOptions,
} from "../config/sessionOptionsConfig";
import { cookies } from "next/headers";

export const getAccountSessionData = async () => {
  try {
    const session = await getIronSession(cookies(), accountSessionOptions);
   
    return session;
  } catch (error) {
    console.log("Error retrieving account session:", error);
    return null;
  }
};

export const getCartSessionData = async () => {
  try {
    const session = await getIronSession(cookies(), cartSessionOptions);

    return session;
  } catch (error) {
    console.log("Error retrieving cart session:", error);
    return null;
  }
};

export const getCheckoutSessionData = async () => {
  try {
    const session = await getIronSession(cookies(), checkoutSessionOptions);

    return session;
  } catch (error) {
    console.log("Error retrieving checkout session:", error);
    return null;
  }
};
