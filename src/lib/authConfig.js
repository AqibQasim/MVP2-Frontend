import Google from "next-auth/providers/google";
import { cookies } from "next/headers";
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
    authorized({ auth, request }) {
      return !!auth?.user;
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
