// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("taskmanager_usertoken")?.value;

  //  If user is NOT logged in & tries to access protected routes
  if (
    !token &&
    (pathname.startsWith("/profile") || pathname.startsWith("/addTask"))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user IS logged in & tries to access login/register
  if (
    token &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  //  If token exists, verify it
  if (token) {
    try {
      await jwtVerify(token, secret);
    } catch (error) {
      // Invalid / expired token
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("taskmanager_usertoken");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/addTask/:path*", "/login"],
};
