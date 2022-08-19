import { NextResponse } from "next/server";
import withMemberstack from "./lib/withMemberstack";

// "/:path((?!_next|admin$|videos$|blog$|[^/.]*).*)";
// /((?!_next|[^/.]*).*)

export const config = {
  matcher: [
    "/([^/.]*)",
    "/",
    "/videos/:path*",
    "/api/:path*",
    "/api/admin/:path*",
  ],
};

const middleware = async (req, event) => {
  const url = req.nextUrl.clone();
  // if request is an api route
  if (req.memberstack && url.pathname.startsWith("/api/admin")) {
    const { app, member, token_verified } = req.memberstack;
    if (!token_verified) {
      return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
    }
  }
  return NextResponse.next();
};

export default withMemberstack(middleware, {
  useRestrictedUrls: true,
});
