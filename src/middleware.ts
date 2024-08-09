import { type NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  DASHBOARD_ROUTE,
  ROOT_ROUTE,
} from "@ncl/app/shared";

// Use a regular expression to match all dashboard routes
const dashboardRouteRegex = new RegExp(`^${DASHBOARD_ROUTE}(/.*)?$`);

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";

  // Redirect to log in if session is not set and the user is trying to access a dashboard route
  if (!session && dashboardRouteRegex.test(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to dashboard if session is set and user tries to access the root
  if (session && request.nextUrl.pathname === ROOT_ROUTE) {
    const absoluteURL = new URL(DASHBOARD_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Allow the request to proceed
  return NextResponse.next();
}
