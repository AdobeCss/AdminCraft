
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // const token = req.cookies.get('nextauth.token_Mweto');

  // if (req.nextUrl.pathname !== '/') {
  //   return NextResponse.redirect(new URL('/Login', req.url));
  // }

  return NextResponse.next();
  }

  export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
