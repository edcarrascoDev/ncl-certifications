import { type NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  DASHBOARD_ROUTE,
  ROOT_ROUTE,
  CLAIMS_COOKIE_NAME,
  USERS_ROUTE,
  COMPANIES_ROUTE,
} from "@ncl/app/shared";

// Use a regular expression to match all dashboard routes
const dashboardRouteRegex = new RegExp(`^${DASHBOARD_ROUTE}(/.*)?$`);
const usersRouteRegex = new RegExp(`^${USERS_ROUTE}(/.*)?$`);
const companiesRouteRegex = new RegExp(`^${COMPANIES_ROUTE}(/.*)?$`);

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";
  const claims = request.cookies.get(CLAIMS_COOKIE_NAME)?.value || "";

  // Redirect to log in if session is not set and the user is trying to access a dashboard route
  if (
    (!session || !claims) &&
    dashboardRouteRegex.test(request.nextUrl.pathname)
  ) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to Dashboard if user is not admin and the user is trying to access a forbidden route
  if (session && claims) {
    const claimsParsed = JSON.parse(claims);
    if (
      !claimsParsed.admin &&
      (usersRouteRegex.test(request.nextUrl.pathname) ||
        companiesRouteRegex.test(request.nextUrl.pathname))
    ) {
      const absoluteURL = new URL(DASHBOARD_ROUTE, request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  if (session && request.nextUrl.pathname === ROOT_ROUTE) {
    // Redirect to dashboard if session is set and user tries to access the root
    const absoluteURL = new URL(DASHBOARD_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Allow the request to proceed
  return NextResponse.next();
}
