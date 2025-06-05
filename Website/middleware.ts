import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

const publicRoutes = createRouteMatcher([
  "/",
  "/signin(.*)",
  "/signup(.*)",
  "/about",
  "/services",
  "/blog",
  "/project",
]);
const invalidRoutes = createRouteMatcher(["/dashboard"]);
const adminRoutes = createRouteMatcher(["/admin(.*)", "/api/users", "/api/users/update"]);
export default clerkMiddleware(async (auth, req) => {
  console.log(`[Middleware] Processing request for URL: ${req.url}`);

  const { userId } = await auth();
  console.log(`[Middleware] User ID: ${userId || "Unauthenticated"}`);

  // Allow public routes
  if (publicRoutes(req)) {
    console.log("[Middleware] Public route accessed, allowing request");
    return NextResponse.next();
  }

  // Handle invalid routes
  if (invalidRoutes(req)) {
    console.log("[Middleware] Invalid route accessed, redirecting to home");
    const url = new URL("/", req.url);
    url.searchParams.set("error", "The page you are trying to access does not exist.");
    return NextResponse.redirect(url);
  }

  // Protect admin routes
  if (adminRoutes(req)) {
    console.log("[Middleware] Admin route accessed");

    if (!userId) {
      console.log("[Middleware] No user ID, redirecting to sign-in");
      const url = new URL("/signin", req.url);
      url.searchParams.set("error", "Please sign in to access the Admin Dashboard.");
      return NextResponse.redirect(url);
    }

    try {
      console.log("[Middleware] Fetching user metadata for user ID:", userId);
      const clerk = await clerkClient();
      const user = await clerk.users.getUser(userId);
      const userRole = user.publicMetadata?.role;
      console.log(`[Middleware] User role: ${userRole || "No role assigned"}`);

      if (userRole !== "admin") {
        console.log("[Middleware] User is not an admin, redirecting to home");
        const url = new URL("/", req.url);
        url.searchParams.set("error", "You do not have permission to access this page.");
        return NextResponse.redirect(url);
      }

      console.log("[Middleware] User is admin, allowing access");
    } catch (error) {
      console.error("[Middleware] Error fetching user metadata:", error);
      const url = new URL("/", req.url);
      url.searchParams.set("error", "An error occurred while verifying your permissions.");
      return NextResponse.redirect(url);
    }
  }

  console.log("[Middleware] Allowing request for non-protected route");
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};