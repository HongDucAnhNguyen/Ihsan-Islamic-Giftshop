// "use server";
import { getIronSession } from "iron-session";
import {
  accountSessionOptions,
  cartSessionOptions,
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
