import {
  getAccountSessionData,
  getCartSessionData,
} from "@/lib/helpers/getSessionData";
import { NextResponse } from "next/server";
import { verifyAsAdmin } from "./lib/helpers/adminRoutesHelper";
// import User from "./backend/models/User";
// import dbConnect from "./backend/config/ConnectDB";

export const middleware = async (req) => {
  // await dbConnect();

  const accountSessionData = await getAccountSessionData();
  const cartSessionData = await getCartSessionData();

  if (
    !accountSessionData?.username &&
    !accountSessionData?.userId &&
    !accountSessionData?.userEmail &&
    !accountSessionData?.userRole
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    if (accountSessionData?.userRole === process.env.ADMIN_ROLE) {
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-is-admin", true);

      return NextResponse.next({
        request: {
          // New request headers
          headers: requestHeaders,
        },
      });
    }
  }

  if (req.nextUrl.pathname === "/shipping") {
    if (!cartSessionData?.cart || cartSessionData?.cart?.length === 0) {
      return NextResponse.redirect(new URL("/cart", req.url));
    }
  }

  if (
    req.nextUrl.pathname.startsWith("/admin") ||
    req.nextUrl.pathname.startsWith("/api/admin")
  ) {
    const isAdmin = verifyAsAdmin();

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/profile", req.url));
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
    "/admin/:path*",
    "/api/admin/:path*",

    // "/api/auth/update-profile",
  ],
};
