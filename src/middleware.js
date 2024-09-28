// import { NextResponse } from "next/server";

// export default function middleware(request) {
//   console.log("hello from middleware 👋");

//   return NextResponse.redirect(new URL("/", request.url));
// }

import { auth } from "@/lib/auth";
export const middleware = auth;

export const config = {
  // matcher: ["/client/:path*", "/candidate/:path*"],
  matcher: ["/candidate/:path*"],
};
