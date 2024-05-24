import { accountSessionOptions } from "@/backend/config/sessionOptionsConfig";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const session = await getIronSession(cookies(), accountSessionOptions);
  session.destroy();
  return NextResponse.redirect(new URL("/", req.url));
};
