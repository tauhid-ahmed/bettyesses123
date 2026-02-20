import { NextResponse } from "next/server";
import { auth } from "./auth";

const authRoutes = [
  "/login",
  "/reset-success",
  "/forgot-password",
  "/reset-password",
  "/signup",
  "/verify-otp",
  "/verify-forgot-password-otp",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // @ts-ignore - auth property is added by NextAuth wrapper
  const session = req.auth;

  console.log("Middleware Debug:", {
    pathname,
    hasSession: !!session,
    userRole: session?.user?.role,
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
    console.log("Redirecting authenticated user from auth route");
    if (isSuperAdmin || isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Case 2: Unauthenticated users trying to access dashboard
  if (!isAuthenticated && isDashboardRoute) {
    console.log("Redirecting unauthenticated user to login");
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Case 3: USER role cannot access dashboard
  if (isAuthenticated && isDashboardRoute && isUser) {
    console.log("Redirecting USER from dashboard to home");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Case 4: Only SUPERADMIN and ADMIN can access dashboard
  if (isAuthenticated && isDashboardRoute && !isSuperAdmin && !isAdmin) {
    console.log("Redirecting unauthorized role to home");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow access
  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Static assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
