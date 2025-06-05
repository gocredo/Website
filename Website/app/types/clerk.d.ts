import { UserResource } from "@clerk/nextjs";

declare module "@clerk/nextjs" {
  interface UserResource {
    privateMetadata: {
      role?: string;
    };
  }
}