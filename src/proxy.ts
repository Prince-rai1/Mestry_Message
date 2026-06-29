import { NextResponse, NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  const url = request.nextUrl

  if (token && (url.pathname.startsWith('/sign-in')
    )){
        return NextResponse.redirect(new URL('/dash-board', request.url))
    }

  if (!token && (url.pathname.startsWith('/dash-board') ||
      url.pathname.startsWith('/verify-code')
    )){
        return NextResponse.redirect(new URL('/sign-up', request.url))
    }

  return NextResponse.next()
   
}

export const config = {
  matcher: [
    "/dash-board/:path*",
    "/verify-code/:path*",
    "/sign-in",
    "/sign-up",
    "/"
  ],
}