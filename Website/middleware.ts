import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = createRouteMatcher([
  "/", 
  "/signin(.*)",
  "/signup(.*)",
  "/about",
  "/services",
  "/blog",
  "/project"
]);

export default clerkMiddleware({
  // Here you can define "beforeAuth" or other hooks if needed
  // but for now, just basic middleware
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/", 
    "/(api|trpc)(.*)"
  ],
};
