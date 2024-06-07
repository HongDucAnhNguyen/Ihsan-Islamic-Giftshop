import dbConnect from "@/lib/config/ConnectDB";

import User from "@/lib/models/User";
import bcrypt from "bcrypt";

import {
  validateEmail,
  validatePassword,
} from "@/lib/helpers/emailAndPasswordValidation";
import { getCartSessionData } from "@/lib/helpers/getSessionData";
import Cart from "@/lib/models/Cart";
export const POST = async (req) => {
  try {
    await dbConnect();

    const guestCartSession = await getCartSessionData();

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

    const newUser = await User.create({
      ...accountData,
      password: hashedPassword,
    });

    await Cart.create({
      userId: newUser._id.toString(),
      items: guestCartSession.cart,
    });

    guestCartSession.destroy();
    return Response.json({ authenticated: true });
  } catch (error) {
    return Response.json(error);
  }
};
