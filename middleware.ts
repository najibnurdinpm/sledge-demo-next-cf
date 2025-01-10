import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();

  const customerCookie = request.cookies.get("session");

  if (!customerCookie && request.nextUrl.pathname.startsWith("/account")) {
    response = NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    customerCookie &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register") ||
      request.nextUrl.pathname.startsWith("/recover"))
  ) {
    response = NextResponse.redirect(new URL("/account", request.url));
  }

  return response;
}
