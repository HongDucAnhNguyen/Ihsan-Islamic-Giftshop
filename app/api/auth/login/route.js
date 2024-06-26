import dbConnect from "@/lib/config/ConnectDB";

import {
  validateEmail,
  validatePassword,
} from "@/lib/helpers/emailAndPasswordValidation";
import User from "@/lib/models/User";

import bcrypt from "bcrypt";
import {
  getAccountSessionData,
  getCartSessionData,
} from "@/lib/helpers/getSessionData";

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
      return Response.json(
        { authenticated: false, message: "invalid credentials" },
        { status: 400 }
      );
    }

    const userRetrieved = await User.findOne({
      email: loginData.email,
    });

    if (!userRetrieved) {
      return Response.json(
        {
          authenticated: false,
          message: "cannot find a user with this email, please try again",
        },
        { status: 400 }
      );
    }

    const validPassword = await bcrypt.compare(
      loginData.password,
      userRetrieved.password
    );

    if (!validPassword) {
      return Response.json(
        { authenticated: false, message: "invalid password" },
        { status: 400 }
      );
    }

    accountSessionData.username = userRetrieved.name;
    accountSessionData.userAvatar = userRetrieved.avatar;
    accountSessionData.userEmail = userRetrieved.email;
    accountSessionData.userJoined = userRetrieved.createdAt;
    accountSessionData.userId = userRetrieved._id;
    accountSessionData.userRole = userRetrieved.role;
    await accountSessionData.save();

    return Response.json({
      authenticated: true,
      message: "logged in successfully",
    });
  } catch (error) {
    return Response.json({
      authenticated: false,
      message: "An error occurred while logging you in, please try again later",
    });
  }
};
