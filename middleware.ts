import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const loginPaths = ['/login', '/register'];
  const requestedPath = req.nextUrl.pathname;
  const token = await getToken({ req });

  if (token && loginPaths.includes(requestedPath)) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
