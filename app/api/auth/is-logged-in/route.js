import { accountSessionOptions } from "@/backend/config/sessionOptionsConfig";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    const session = await getIronSession(cookies(), accountSessionOptions);

    return Response.json({
      isLoggedIn: session?.username ? true : false,
      userId: session?.userId,
    });
  } catch (error) {
    return Response.json(error.message);
  }
};
