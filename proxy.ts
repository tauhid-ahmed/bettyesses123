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

  // Skip middleware for API routes, Next.js internals, and static assets
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    /\.(jpg|jpeg|png|gif|svg|ico|webp|css|js)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Get session - this is crucial for Vercel
  const session = await auth();

  // Debug logging for Vercel deployment (check logs in Vercel dashboard)
  console.log("Middleware Debug:", {
    pathname,
    hasSession: !!session,
    userRole: session?.user?.role,
    userId: session?.user?.id,
    cookies: request.cookies.getAll().map((c) => c.name),
  });

  const isAuthenticated = !!session;
  const userRole = session?.user?.role;
  const isSuperAdmin = userRole === "SUPERADMIN";
  const isAdmin = userRole === "ADMIN";
  const isUser = userRole === "USER";

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // Case 1: Authenticated users should NOT access auth pages
  if (isAuthenticated && isAuthRoute) {
    console.log(
      "Authenticated user trying to access auth route, redirecting..."
    );
    if (isSuperAdmin || isAdmin) {
      console.log("Redirecting admin to dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // All other authenticated users (including USER role) go to home
    console.log("Redirecting authenticated user to home");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Case 2: Unauthenticated users trying to access dashboard
  if (!isAuthenticated && isDashboardRoute) {
    console.log("Redirecting unauthenticated user to login");
    const loginUrl = new URL(signinPath(), request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Case 3: CRITICAL - Redirect USER role from dashboard to homepage
  if (isAuthenticated && isDashboardRoute && isUser) {
    console.log(
      "Redirecting USER from dashboard to home:",
      session.user?.email
    );
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Case 4: Only SUPERADMIN and ADMIN can access dashboard
  if (isAuthenticated && isDashboardRoute && !isSuperAdmin && !isAdmin) {
    console.log("Redirecting unauthorized role to home:", userRole);
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Default: Allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
