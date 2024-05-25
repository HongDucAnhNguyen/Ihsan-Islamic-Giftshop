import { getAccountSessionData } from "@/backend/helpers/getSessionData";
import User from "@/backend/models/User";
import bcrypt from "bcrypt";
export const PUT = async (req) => {
  try {
    const { userId } = await getAccountSessionData();
    const { currentPassword, newPassword } = await req.json();
    const userRetrieved = await User.findById(userId);

    if (!userRetrieved) {
      return Response.json({ error: "invalid credentials" }, { status: 400 });
    }

    const validPassword = await bcrypt.compare(
      currentPassword,
      userRetrieved.password
    );

    if (!validPassword) {
      return Response.json({ error: "invalid password" }, { status: 400 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(userId, { password: hashedNewPassword });
    return Response.json({ passwordUpdated: true });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
};
