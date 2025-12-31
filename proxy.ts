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
  const isUser = session?.user?.role === "USER";

  // Skip middleware for API routes, Next.js internals, and static assets
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
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // If user is authenticated and trying to access auth pages, redirect to dashboard (only for SUPERADMIN)
  if (isAuthenticated && isAuthRoute && isSuperAdmin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is authenticated and trying to access auth pages, redirect to home (for regular users)
  if (isAuthenticated && isAuthRoute && isUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is NOT authenticated and trying to access dashboard, redirect to login
  if (!isAuthenticated && isDashboardRoute) {
    const loginUrl = new URL(signinPath(), request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user has role "USER" and trying to access dashboard, redirect them away (e.g., to home or unauthorized page)
  if (isAuthenticated && isUser && isDashboardRoute) {
    return NextResponse.redirect(new URL("/", request.url)); // or "/unauthorized"
  }

  // Allow access to all other routes
  return NextResponse.next();
}
