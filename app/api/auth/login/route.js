import dbConnect from "@/backend/config/ConnectDB";

import {
  validateEmail,
  validatePassword,
} from "@/backend/helpers/emailAndPasswordValidation";
import User from "@/backend/models/User";

import bcrypt from "bcrypt";
import {
  getAccountSessionData,
  getCartSessionData,
} from "@/backend/helpers/getSessionData";

export const POST = async (req) => {
  try {
    await dbConnect();
    const accountSessionData = await getAccountSessionData();
    const guestCartSession = await getCartSessionData();

    guestCartSession.destroy();

    const loginData = await req.json();

    if (
      !validateEmail(loginData.email) ||
      !validatePassword(loginData.password)
    ) {
      return Response.json({ error: "invalid credentials" }, { status: 400 });
    }

    const userRetrieved = await User.findOne({
      email: loginData.email,
    });

    if (!userRetrieved) {
      return Response.json({ error: "invalid credentials" }, { status: 400 });
    }

    const validPassword = await bcrypt.compare(
      loginData.password,
      userRetrieved.password
    );

    if (!validPassword) {
      return Response.json({ error: "invalid password" }, { status: 400 });
    }

    accountSessionData.username = userRetrieved.name;
    accountSessionData.userAvatar = userRetrieved.avatar;
    accountSessionData.userEmail = userRetrieved.email;
    accountSessionData.userJoined = userRetrieved.createdAt;
    accountSessionData.userId = userRetrieved._id;
    accountSessionData.userRole = userRetrieved.role;
    await accountSessionData.save();

    return Response.json({ authenticated: true });
  } catch (error) {
    return Response.json(error);
  }
};
