import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Let Next.js continue processing all requests.
  // Security and session checks are performed securely in React Server Components and API routes.
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to add more paths here if required.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
