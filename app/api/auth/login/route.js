import dbConnect from "@/backend/config/ConnectDB";
import { SessionOptions } from "@/backend/config/sessionOptionsConfig";
import {
  validateEmail,
  validatePassword,
} from "@/backend/helpers/emailAndPasswordValidation";
import User from "@/backend/models/User";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { getSessionData } from "@/backend/helpers/getSessionData";

export const POST = async (req) => {
  try {
    await dbConnect();
    const session = await getSessionData();

    const loginData = await req.json();

    if (
      !validateEmail(loginData.email) ||
      !validatePassword(loginData.password)
    ) {
      return Response.json({ error: "invalid credentials" }, { status: 400 });
    }

    const userRetrieved = await User.findOne({
      name: loginData.name,
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

    session.username = userRetrieved.name;

    session.userId = userRetrieved._id;
    session.userRole = userRetrieved.role;
    session.userEmail = userRetrieved.email;
    await session.save();

    return Response.json({ authenticated: true });
  } catch (error) {
    return Response.json(error);
  }
};
