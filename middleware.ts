import { NextRequest, NextResponse } from "next/server";
import { signinPath } from "./paths";
import { auth } from "./auth";

// Force Edge Runtime
export const runtime = "experimental-edge";

const authRoutes = [
  "/login",
  "/reset-success",
  "/forgot-password",
  "/reset-password",
  "/signup",
  "/verify-otp",
  "/verify-forgot-password-otp",
];

// Add public routes that don't require authentication
const publicRoutes = [
  "/", // homepage
  "/about",
  "/contact",
  // Add any other public pages here
];

export async function middleware(request: NextRequest) {
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

  // Get session - wrap in try-catch for Vercel edge issues
  let session;
  try {
    session = await auth();
    console.log("Session retrieved:", {
      exists: !!session,
      email: session?.user?.email,
      role: session?.user?.role,
      pathname,
    });
  } catch (error) {
    console.error("Auth error in middleware:", error);
    // If auth fails, treat as unauthenticated
    session = null;
  }

  const isAuthenticated = !!session;
  const userRole = session?.user?.role;
  const isSuperAdmin = userRole === "SUPERADMIN";
  const isAdmin = userRole === "ADMIN";
  const isUser = userRole === "USER";

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Case 1: Authenticated users should NOT access auth pages
  if (isAuthenticated && isAuthRoute) {
    console.log(
      "Authenticated user trying to access auth route, redirecting..."
    );
    if (isSuperAdmin || isAdmin) {
      console.log("Redirecting admin to dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    console.log("Redirecting authenticated user to home");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Case 2: Unauthenticated users trying to access dashboard
  if (!isAuthenticated && isDashboardRoute) {
    console.log("Redirecting unauthenticated user to login from dashboard");
    const loginUrl = new URL(signinPath(), request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Case 3: USER role cannot access dashboard
  if (isAuthenticated && isDashboardRoute && isUser) {
    console.log(
      "Redirecting USER from dashboard to home:",
      session?.user?.email
    );
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Case 4: Only SUPERADMIN and ADMIN can access dashboard
  if (isAuthenticated && isDashboardRoute && !isSuperAdmin && !isAdmin) {
    console.log("Redirecting unauthorized role to home:", userRole);
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Case 5: Unauthenticated users trying to access protected routes (not public, not auth)
  if (!isAuthenticated && !isAuthRoute && !isPublicRoute) {
    console.log(
      "Redirecting unauthenticated user to login from protected route:",
      pathname
    );
    const loginUrl = new URL(signinPath(), request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Default: Allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
