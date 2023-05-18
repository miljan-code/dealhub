import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const loginPaths = ['/login', '/register'];
  const restrictedPaths = [
    '/create',
    '/my-listings',
    '/messages',
    '/notifications',
    '/ratings',
    '/favorites',
  ];
  const requestedPath = req.nextUrl.pathname;
  const token = await getToken({ req });

  if (token && loginPaths.includes(requestedPath)) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  if (!token && restrictedPaths.includes(requestedPath)) {
    const url = new URL('/login', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
