// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// }


// src/middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export const config = {
  matcher: [
    // Protect all routes except static files
    "/((?!.+\\.[\\w]+$|_next).*)", // matches everything except static assets
    "/",                          // root
    "/dashboard(.*)",             // routes that need authentication
    "/profile(.*)",               // additional paths like profile
  ],
};

export default clerkMiddleware();