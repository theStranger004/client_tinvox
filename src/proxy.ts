import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/admin/login';
  const isAdminPath = path.startsWith('/admin');

  // Get the token from cookies
  const token = request.cookies.get('token')?.value || '';

  // If trying to access admin (but not login) without token, redirect to login
  if (isAdminPath && !isPublicPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
  }

  // If trying to access login page with a token, redirect to admin dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
