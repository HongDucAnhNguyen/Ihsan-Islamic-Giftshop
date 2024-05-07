import { getIronSession } from "iron-session";
import { SessionOptions } from "../config/sessionOptionsConfig";
import { cookies } from "next/headers";

export const getSessionData = async () => {
  const session = await getIronSession(cookies(), SessionOptions);
  //   console.log(session.name);
  return session;
};
