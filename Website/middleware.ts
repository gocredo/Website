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

export default clerkMiddleware(async (auth, req) => {
  console.log(`[Middleware] Processing request for URL: ${req.url}`);

  // Resolve the auth object
  const { userId } = await auth();
  console.log(`[Middleware] User ID: ${userId || "Unauthenticated"}`);

  // Allow public routes
  if (publicRoutes(req)) {
    console.log("[Middleware] Public route accessed, allowing request");
    return NextResponse.next();
  }

  // Protect /adminDashboard route
  const isAdminDashboard = createRouteMatcher(["/adminDashboard"])(req);

  if (isAdminDashboard) {
    console.log("[Middleware] AdminDashboard route accessed");

    // Check if user is authenticated
    if (!userId) {
      console.log("[Middleware] No user ID, redirecting to sign-in");
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // Fetch user metadata using updated Clerk SDK
    try {
      console.log("[Middleware] Fetching user metadata for user ID:", userId);
      const clerk = await clerkClient();
      const user = await clerk.users.getUser(userId);
      const userRole = user.privateMetadata?.role;
      console.log(`[Middleware] User role: ${userRole || "No role assigned"}`);

      if (userRole !== "admin") {
        console.log("[Middleware] User is not an admin, redirecting to home");
        const url = new URL("/", req.url);
        url.searchParams.set("error", "You do not have permission to access the Admin Dashboard.");
        return NextResponse.redirect(url);
      }

      console.log("[Middleware] User is admin, allowing access to AdminDashboard");
    } catch (error) {
      console.error("[Middleware] Error fetching user metadata:", error);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  console.log("[Middleware] Allowing request for non-protected route");
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};