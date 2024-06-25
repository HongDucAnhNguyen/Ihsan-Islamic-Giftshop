import {
  getAccountSessionData,
  getCartSessionData,
} from "@/lib/helpers/getSessionData";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const accountSessionData = await getAccountSessionData();
  const cartSessionData = await getCartSessionData();
  let response = NextResponse.next();
  let requestHeaders = new Headers(req.headers);
  if (
    !accountSessionData ||
    (!accountSessionData?.username &&
      !accountSessionData?.userId &&
      !accountSessionData?.userEmail &&
      !accountSessionData?.userRole)
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (accountSessionData?.userRole === process.env.ADMIN_ROLE) {
    requestHeaders.set("x-is-admin", "true");

    response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });
  }

  if (req.nextUrl.pathname === "/shipping") {
    if (!cartSessionData?.cart || cartSessionData?.cart?.length === 0) {
      return NextResponse.redirect(new URL("/cart", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    const isAdmin = requestHeaders.get("x-is-admin") === "true";

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }

  return response;
};

export const config = {
  matcher: [
    "/profile/:path*",
    "/address/:path*",
    "/shipping",
    "/admin/:path*",
    "/reviews/:path*",
  ],
};
