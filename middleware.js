import {
  getAccountSessionData,
  getCartSessionData,
} from "@/backend/helpers/getSessionData";
import { NextResponse } from "next/server";
// import User from "./backend/models/User";
// import dbConnect from "./backend/config/ConnectDB";

export const middleware = async (req) => {
  // await dbConnect();

  const accountSessionData = await getAccountSessionData();
  const cartSessionData = await getCartSessionData();

  if (
    !accountSessionData?.username &&
    !accountSessionData?.userId &&
    !accountSessionData?.userEmail
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // const userRetrieved = await User.findOne({
  //   _id: accountSession.userId,
  //   email: accountSession.userEmail,
  //   usernames: accountSession.username,
  // });

  // if (!userRetrieved) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
  if (req.nextUrl.pathname === "/shipping") {
    if (!cartSessionData?.cart || cartSessionData?.cart?.length === 0) {
      return NextResponse.redirect(new URL("/cart", req.url));
    }
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    //     /*
    //      * Match all request paths except for the ones starting with:
    //      * - api (API routes)
    //      * - _next/static (static files)
    //      * - _next/image (image optimization files)
    //      * - favicon.ico (favicon file)
    //      */
    //     //"/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/profile/:path*",
    "/address/:path*",
    "/shipping",

    // "/api/auth/update-profile",
  ],
};
