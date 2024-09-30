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
      const userRoleCookie = cookies().get("credentialLoginToken");
      const credentialUser = userRoleCookie ? userRoleCookie.value : null;
      const { anyNameForData, error: credentialUserError } =
        await validateAndDecodeToken(credentialUser);

      if (!user) {
        console.log("User not authenticated");
        return false;
      }

      const userRole = user?.user_role;
      const url = request?.nextUrl;
      const pathname = url?.pathname;
      const visitedId = pathname.split("/").at(2);
      const ids = {
        client: "client_id",
        customer: "customer_id",
      };
      const currentUserId = user[ids[userRole]];
      const isImposter = currentUserId !== visitedId;
      const isClient = userRole === "client";
      const isCandidate = userRole === "customer";
      const clientRoute = pathname.startsWith("/client");
      const candidateRoute = pathname.startsWith("/candidate");
      const onClientPage = pathname === "/client";
      const onCandidatePage = pathname === "/candidate";
      const onCandidateRoute = pathname.startsWith("/candidate");
      const onClientRoute = pathname.startsWith("/client");

      //   Log important values for debugging
      console.log("AUTH OBJECT", auth);
      console.log("USER ROLE", userRole);
      console.log("IS IMPOSTER: ?", isImposter);
      console.log("Current User ID", currentUserId);
      console.log("Request URL", url);
      console.log("Request Pathname", pathname);
      console.log("Visited ID", visitedId);
      console.log("IS CLIENT: ", isClient);
      console.log("IS CANDIDATE: ", isCandidate);

      // Candidate
      if (onCandidateRoute) {
        if (!isCandidate) {
          return NextResponse.redirect(new URL("/login", request.url));
        }
        if (visitedId && isImposter) {
          return NextResponse.redirect(new URL("/login", request.url));
        }
        if (onCandidatePage && currentUserId) {
          return NextResponse.redirect(
            new URL(`/candidate/${currentUserId}`, request.url),
          );
        }
      }

      // CLIENT
      //   if (onClientRoute) {
      //     console.log("CLIENT ROUTE");
      //     if (!isClient) {
      //       console.log("CLIENT ROUTE BUT NOT A CLIENT GO HOME");
      //       return NextResponse.redirect(new URL("/login", request.url));
      //     }
      //     if (visitedId && isImposter) {
      //       console.log("CLIENT ROUTE BUT A IMPOSTER GO HOME");
      //       return NextResponse.redirect(new URL("/login", request.url));
      //     }
      //     if (onClientPage && currentUserId) {
      //       console.log(
      //         "CLIENT ROUTE ON CLIENT PAGE GO TO U'R ID PAGE: ",
      //         currentUserId,
      //       );
      //       return NextResponse.redirect(
      //         new URL(`/client/${currentUserId}`, request.url),
      //       );
      //     }
      //   }

      console.log("OK TO PROCEEED");

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
