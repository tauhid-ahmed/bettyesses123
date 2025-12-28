import { NextRequest, NextResponse } from "next/server";
import { signinPath } from "./paths";
import { auth } from "./auth";

const authRoutes = [
  "/login",
  "/reset-success",
  "/forgot-password",
  "/reset-password",
  "/signup",
  "/verify-otp",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth();

  const SUPER_ADMIN = "SUPERADMIN";
  const isSuperAdmin = session?.user?.role === SUPER_ADMIN;

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
  const isProtectedRoute = pathname.startsWith("/dashboard") && !isSuperAdmin;

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (isAuthenticated && isAuthRoute && isSuperAdmin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is NOT authenticated and trying to access protected dashboard routes, redirect to login
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL(signinPath(), request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow access to all other routes (marketing pages are public)
  return NextResponse.next();
}
