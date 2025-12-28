import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = [
  "/login",
  "/reset-success",
  "/forgot-password",
  "/reset-password",
  "/reset-success",
  "/signup",
  "/verify-otp",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    /\.(jpg|jpeg|png|gif|svg|ico|webp|css|js)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const sessionToken =
    request.cookies.get("authjs.session-token") ||
    request.cookies.get("__Secure-authjs.session-token");

  const isAuthenticated = !!sessionToken;
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // If user is authenticated and trying to access auth pages, redirect to home
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is NOT authenticated and trying to access protected pages, redirect to login
  if (!isAuthenticated && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
