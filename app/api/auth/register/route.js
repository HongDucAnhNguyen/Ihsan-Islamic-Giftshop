import dbConnect from "@/backend/config/ConnectDB";
import { SessionOptions } from "@/backend/config/sessionOptionsConfig";
import User from "@/backend/models/User";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import {
  validateEmail,
  validatePassword,
} from "@/backend/helpers/emailAndPasswordValidation";
export const POST = async (req) => {
  try {
    await dbConnect();
    // const session = await getIronSession(cookies(), SessionOptions);
    const accountData = await req.json();

    if (
      !validateEmail(accountData.email) ||
      !validatePassword(accountData.password)
    ) {
      return Response.json({ error: "invalid credentials" }, { status: 400 });
    }

    const userAlreadyExists = await User.findOne({
      name: accountData.name,
      email: accountData.email,
    });

    if (userAlreadyExists) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(accountData.password, 10);

    await User.create({
      ...accountData,
      password: hashedPassword,
    });
    // session.username = newUser.name;
    // session.userId = newUser._id;
    // session.userRole = newUser.role;
    // session.userEmail = newUser.email;
    // await session.save();

    return Response.json({ authenticated: true });
  } catch (error) {
    return Response.json(error);
  }
};
