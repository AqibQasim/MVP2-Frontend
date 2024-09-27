import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { checkClientByEmail, checkCustomerByEmail } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // CredentialProvider,
  ],
  callbacks: {
    authorized({ auth, request }) {
      // can do advance authorization based on request
      return !!auth?.user;
    },
    // runs before actual signup process
    // can perform all kind of operations that are associated with the sugnin process
    // bit like middleware
    // happen after credential, but before really logged in to application
    async signIn({ user, account, profile, context }) {
      // Get user
      try {
        let existingUser = null;
        const { userRole } = context; //client || customer
        console.log("User role in google callback: ", userRole);
        if (userRole === "customer") {
          existingUser = await checkCustomerByEmail(user.email);
          if (!existingUser)
            // await createCustomer({ email: user.email, fullName: user.name });
            await createCustomer({
              email: user.email,
              name: user.name,
              user_role: userRole,
              method: "signup",
            });
          return true;
        }

        existingUser = await checkClientByEmail(user.email);
        if (!existingUser)
          await createUser({ email: user.email, fullName: user.name });
        return true;

        // const existingUser = await getUser(user.email);

        // // First time ? create user
        // if (!existingUser)
        //   await createUser({ email: user.email, fullName: user.name });

        // return true;
      } catch (error) {
        return false;
      }
    },
    // runs after signin callback
    // and also each time the session is checkout out
    // example when we call auth function
    // async session({ session, user }) {
    //   // get new user
    //   const client = await getUser(session.user.email);
    //   //   mutate session object
    //   const clientOrCandidate = client?.client_id ? "client_id" : "customer_id";

    //   session.user.userId = client?.[clientOrCandidate];
    //   return session;
    // },
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
