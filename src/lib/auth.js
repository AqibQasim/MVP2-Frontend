import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { checkCustomerByEmail, createUserGoogle } from "./data-service";

const authConfig = {
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
      try {
        const { existingUser } = await checkCustomerByEmail(user.email);

        if (!existingUser)
          await createUserGoogle({
            email: user.email,
            name: user.name,
            user_role: "customer",
            method: "signup",
          });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, token }) {
      const { data: customer } = await checkCustomerByEmail(session.user.email);
      session.user.customField = customer.customer_id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
