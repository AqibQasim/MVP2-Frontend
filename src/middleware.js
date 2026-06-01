import { auth } from "@/lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/client/:path*", "/candidate/:path*", "/talent-login", "/company-login"],
};
