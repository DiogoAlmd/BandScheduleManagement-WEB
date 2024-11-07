import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decode, JwtPayload } from "jsonwebtoken";

const publicRoutes = ["/login/sign-in", "/about", "/contact"];

const adminRoutes = [
  "/dashboard/admin/home",
  "/dashboard/admin/instruments",
  "/dashboard/admin/musicians",
  "/dashboard/admin/profile",
  "/dashboard/admin/scales",
  "/dashboard/admin/users",
];
const musicianRoutes = [
  "/dashboard/musician/home",
  "/dashboard/musician/profile",
  "/dashboard/musician/scales",
];

const isPublicRoute = (pathname: string): boolean => {
  return publicRoutes.includes(pathname);
};

const isAllowedToAccess = (pathname: string, role: string): boolean => {
  const allowedRoutes = role === "admin" ? adminRoutes : musicianRoutes;
  return allowedRoutes.some((route) => pathname.startsWith(route));
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token");

  if (!token) {
    if (!isPublicRoute(pathname)) {
      return NextResponse.redirect(new URL("/login/sign-in", request.url));
    }
    return NextResponse.next();
  }

  try {
    const decodedToken = decode(token.value) as JwtPayload;
    const userRole = decodedToken.role;

    if (!isAllowedToAccess(pathname, userRole)) {
      const defaultRedirect =
        userRole === "admin"
          ? "/dashboard/admin/home"
          : "/dashboard/musician/home";
      return NextResponse.redirect(new URL(defaultRedirect, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Token inválido ou erro na autenticação:", error);
    return NextResponse.redirect(new URL("/login/sign-in", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|terms.pdf|manifest.json|policies.pdf|images/login-image.svg|icons/(?:ios|android|windows11)/.*).*)",
  ],
};
