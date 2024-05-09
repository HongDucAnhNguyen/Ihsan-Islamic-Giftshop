import { accountSessionOptions } from "@/backend/config/sessionOptionsConfig";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const GET = async () => {
  const session = await getIronSession(cookies(), accountSessionOptions);
  session.destroy();
  redirect("/");
};
