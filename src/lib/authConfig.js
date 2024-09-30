import { validateAndDecodeToken } from "@/utils/validateAndDecodeToken";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  checkClientByEmail,
  checkCustomerByEmail,
  createUserGoogle,
} from "./data-service";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async authorized({ auth, request }) {
      const user = auth?.user;
      const credentialUserToken =
        cookies().get("credentialLoginToken")?.value || null;
      const { anyNameForData: credentialUser, error: credentialUserError } =
        await validateAndDecodeToken(credentialUserToken);

      const url = request?.nextUrl;
      const pathname = url?.pathname;
      const isAuthenticated = user || credentialUser?.id;
      const loginPage = pathname === "/login";
      const signupPage = pathname === "/signup";
      const googleUserRedirectPath = user
        ? `/${user.user_role}/${user[`${user.user_role}_id`]}`
        : null;

      const credentialUserRedirectPath = credentialUser?.id
        ? `/${credentialUser.user_role}/${credentialUser.id}`
        : null;

      if (isAuthenticated && (loginPage || signupPage)) {
        const redirectPath = user
          ? googleUserRedirectPath
          : credentialUserRedirectPath;
        return NextResponse.redirect(new URL(redirectPath, request.url));
      }

      // NOT AUTHENTICATED
      if (!isAuthenticated) {
        console.log("User not authenticated");
        return false;
      }

      // Client/Candidate route protection
      const visitedId = pathname.split("/").at(2);
      const candidateRoute = pathname.startsWith("/candidate");
      const clientRoute = pathname.startsWith("/client");

      // Google login?
      if (user) {
        const googleUserRole = user?.user_role;
        const ids = {
          client: "client_id",
          customer: "customer_id",
        };
        const currentUserId = user[ids[googleUserRole]];
        const isCandidate = googleUserRole === "customer";
        const isImposter = currentUserId !== visitedId;

        if (candidateRoute) {
          if (!isCandidate || (visitedId && isImposter)) {
            return NextResponse.redirect(new URL("/login", request.url));
          }
          if (pathname === "/candidate" && currentUserId) {
            return NextResponse.redirect(
              new URL(`/candidate/${currentUserId}`, request.url),
            );
          }
        }

        if (clientRoute) {
          const isClient = googleUserRole === "client";
          if (!isClient || (visitedId && isImposter)) {
            return NextResponse.redirect(new URL("/login", request.url));
          }
          if (pathname === "/client" && currentUserId) {
            return NextResponse.redirect(
              new URL(`/client/${currentUserId}`, request.url),
            );
          }
        }
      } else if (credentialUser) {
        const credentialUserRole = credentialUser.user_role;
        const credentialUserId = credentialUser.id;
        const isCandidate = credentialUserRole === "customer";
        const isClient = credentialUserRole === "client";
        const isImposter = credentialUserId !== visitedId;

        if (candidateRoute) {
          if (!isCandidate || (visitedId && isImposter)) {
            return NextResponse.redirect(new URL("/login", request.url));
          }
          if (pathname === "/candidate" && credentialUserId) {
            return NextResponse.redirect(
              new URL(`/candidate/${credentialUserId}`, request.url),
            );
          }
        }

        if (clientRoute) {
          if (!isClient || (visitedId && isImposter)) {
            return NextResponse.redirect(new URL("/login", request.url));
          }
          if (pathname === "/client" && credentialUserId) {
            return NextResponse.redirect(
              new URL(`/client/${credentialUserId}`, request.url),
            );
          }
        }
      }

      console.log("OK TO PROCEED");
      return true;
    },
    async signIn({ user, account, profile }) {
      const role = {
        customer: checkCustomerByEmail,
        client: checkClientByEmail,
      };
      try {
        const userRoleCookie = cookies().get("user_role");
        const userRole = userRoleCookie ? userRoleCookie.value : "customer";

        const { existingUser } = await role[userRole](user.email);
        if (!existingUser)
          await createUserGoogle({
            email: user.email,
            name: user.name,
            user_role: userRole,
            method: "signup",
          });
        return true;
      } catch {
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        const userRoleCookie = cookies().get("user_role");
        token.user_role = userRoleCookie ? userRoleCookie.value : "customer";
      }
      return token;
    },
    async session({ session, token }) {
      const role = {
        customer: async () => {
          const { data: customer } = await checkCustomerByEmail(
            session.user.email,
          );
          return customer.customer_id;
        },
        client: async () => {
          const { data: client } = await checkClientByEmail(session.user.email);
          return client.client_id;
        },
      };

      const userRole = token.user_role;
      if (userRole === "customer") {
        session.user.client_id = null;
        session.user.customer_id = await role.customer();
        session.user.user_role = userRole;
      }
      if (userRole === "client") {
        session.user.client_id = await role.client();
        session.user.customer_id = null;
        session.user.user_role = userRole;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
