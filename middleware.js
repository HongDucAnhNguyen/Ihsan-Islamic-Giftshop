import { getAccountSessionData } from "@/backend/helpers/getSessionData";
import { NextResponse } from "next/server";
// import User from "./backend/models/User";
// import dbConnect from "./backend/config/ConnectDB";

export const middleware = async (req) => {
  // await dbConnect();

  const accountSession = await getAccountSessionData();

  if (
    !accountSession?.username &&
    !accountSession?.userId &&
    !accountSession?.userEmail
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
  // if (req.nextUrl.pathname === "/api/auth/update-profile") {
  //   //process any files under field name "image"
  //   multerUpload.array("image");
  // }

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
    "/address/new",
    // "/api/auth/update-profile",
  ],
};
