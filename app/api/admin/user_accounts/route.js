export const dynamic = "force-dynamic";

import dbConnect from "@/lib/config/ConnectDB";
import User from "@/lib/models/User";
import { revalidatePath } from "next/cache";

export const GET = async (req) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    const userFound = await User.findById(userId);

    if (!userFound) {
      return Response.json({ error: "Unauthorized request" }, { status: 401 });
    }
    if (userFound?.role !== process.env.ADMIN_ROLE) {
      return Response.json({ error: "Unauthorized request" }, { status: 401 });
    }

    const allUsers = await User.find({ role: { $ne: process.env.ADMIN_ROLE } });
    revalidatePath("/admin/user_accounts");
    return Response.json(allUsers);
  } catch (error) {
    return Response.json({ error: error.message });
  }
};
