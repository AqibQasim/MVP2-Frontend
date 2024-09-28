import NextAuth from "next-auth";
import { authConfig } from "./authConfig";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
