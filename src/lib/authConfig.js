
// import { validateAndDecodeToken } from "@/utils/validateAndDecodeToken";
// import Google from "next-auth/providers/google";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import {
//   checkClientByEmail,
//   checkCustomerByEmail,
//   createUserGoogle,
// } from "./data-service";
// //import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";

// export const authConfig = {
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//       authorization: {
//         //params: { prompt: 'select_account' }
//         params: {
//           prompt: "select_account",
//           access_type: "offline",
//           response_type: "code",
//           scope: "profile email",
//         },
//       },
//     }),
//   ],
  
//   trustHost: true,

//   callbacks: {
//     async authorized({ auth, request }) {
//       console.log("AAAAHILL SIGN UP WITH  GOOOGLE ");
  
//       const user = auth?.user;
//       if (!user) return false; // Ensure user exists
  
//       // Assign userRole before using it
//       const userRoleCookie = cookies().get("user_role");
//       const userRole = userRoleCookie ? userRoleCookie.value : "customer";
  
//       // Validate email domain for client role
//       if (userRole === "client") {
//         const emailDomain = user.email.split("@")[1];
//         if (!allowedDomains.includes(emailDomain)) {
//           console.error("Access denied: Only company emails are allowed");
//           return false; // Prevent sign-in
//         }
//       }
  
//       const credentialUserToken =
//         cookies().get("credentialLoginToken")?.value || null;
//       const { anyNameForData: credentialUser, error: credentialUserError } =
//         await validateAndDecodeToken(credentialUserToken);
  
//       const url = request?.nextUrl;
//       const pathname = url?.pathname;
//       const isAuthenticated = user || credentialUser?.id;
//       const loginPage = pathname === "/login";
//       const signupPage = pathname === "/signup";
//       const googleUserRedirectPath = user
//         ? `/${user.user_role === "client" ? "client/" + user[`client_id`] : "candidate/" + user[`customer_id`]}` 
//         : null;
  
//       const credentialUserRedirectPath = credentialUser?.id
//         ? `/${credentialUser.user_role === "client" ? credentialUser.user_role : "candidate"}/${credentialUser.id}` 
//         : null;
  
//       if (isAuthenticated && (loginPage || signupPage)) {
//         const redirectPath = user
//           ? googleUserRedirectPath
//           : credentialUserRedirectPath;
//         return NextResponse.redirect(new URL(redirectPath, request.url));
//       }
  
//       if (!isAuthenticated) {
//         console.log("User not authenticated");
//         return false;
//       }
  
//       // Additional route protection logic
//       const visitedId = pathname.split("/").at(2);
//       const candidateRoute = pathname.startsWith("/candidate");
//       const clientRoute = pathname.startsWith("/client");
  
//       if (user) {
//         const googleUserRole = user?.user_role;
//         const ids = {
//           client: "client_id",
//           customer: "customer_id",
//         };
//         const currentUserId = user[ids[googleUserRole]];
//         const isCandidate = googleUserRole === "customer";
//         const isImposter = currentUserId !== visitedId;
  
//         if (candidateRoute) {
//           if (!isCandidate || (visitedId && isImposter)) {
//             return NextResponse.redirect(new URL("/login", request.url));
//           }
//           if (pathname === "/candidate" && currentUserId) {
//             return NextResponse.redirect(new URL(`/candidate/${currentUserId}`, request.url));
//           }
//         }
  
//         if (clientRoute) {
//           const isClient = googleUserRole === "client";
//           if (!isClient || (visitedId && isImposter)) {
//             return NextResponse.redirect(new URL("/login", request.url));
//           }
//           if (pathname === "/client" && currentUserId) {
//             return NextResponse.redirect(new URL(`/client/${currentUserId}`, request.url));
//           }
//         }
//       }
//       console.log("OK TO PROCEED");
//       return true;
//     },
  
//     async signIn({ user, account, profile }) {
//       if (!user) return false;
  
//       const userRoleCookie = cookies().get("user_role");
//       const userRole = userRoleCookie ? userRoleCookie.value : "customer";
  
//       // Validate email domain after getting userRole
//       if (userRole === "client") {
//         const emailDomain = user.email.split("@")[1];
//         if (!allowedDomains.includes(emailDomain)) {
//           console.error("Access denied: Only company emails are allowed");
//           return false; // Prevent sign-in
//         }
//       }
  
//       console.log("////////////////////", user);
//       const role = {
//         customer: checkCustomerByEmail,
//         client: checkClientByEmail,
//       };
  
//       const { existingUser } = await role[userRole](user.email);
//       if (!existingUser) {
//         let stripeData;
//         const stripeResponse = await fetch(
//           `${process.env.NEXTAUTH_URL}/api/create-customer`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               email: user.email,
//               name: user.name,
//             }),
//           }
//         );
//         stripeData = await stripeResponse.json();
//         if (userRole === "client" && stripeResponse.status !== 200) {
//           throw new Error(stripeData.error);
//         }
  
//         const result = await createUserGoogle({
//           email: user.email,
//           name: user.name,
//           user_role: userRole,
//           method: "signup",
//         });
  
//         console.log("USER ROLE IS: ", userRole);
//         let createAccountResponse, createAccountData;
  
//         if (userRole === "client") {
//           createAccountResponse = await fetch(
//             `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/create-stripe-account`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 client_id: result.data.client_id,
//                 stripe_id: stripeData?.customer?.id,
//               }),
//             }
//           );
//         } else {
//           createAccountResponse = await fetch(
//             `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/create-customer-stripe-account`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 customer_id: result.data.customer_id,
//                 stripe_id: stripeData?.customer?.id,
//               }),
//             }
//           );
//         }
  
//         createAccountData = await createAccountResponse.json();
//         if (createAccountResponse.status !== 200) {
//           throw new Error(createAccountData.error);
//         }
//         console.log("Stripe account created successfully:", createAccountData);
//       }
  
//       return true;
//     },
  
//     async jwt({ token, user }) {
//       if (user) {
//         const userRoleCookie = cookies().get("user_role");
//         const userRole = userRoleCookie ? userRoleCookie.value : "customer";
  
//         if (userRole === "client") {
//           const emailDomain = user.email.split("@")[1];
//           if (!allowedDomains.includes(emailDomain)) {
//             console.error("Access denied: Only company emails are allowed");
//             return false; // Prevent sign-in
//           }
//         }
  
//         token.user_role = userRole;
//       }
//       return token;
//     },
  
//     async session({ session, token }) {
//       const role = {
//         customer: async () => {
//           const { data: customer } = await checkCustomerByEmail(session.user.email);
//           return customer.customer_id;
//         },
//         client: async () => {
//           const { data: client } = await checkClientByEmail(session.user.email);
//           return client.client_id;
//         },
//       };
  
//       const userRole = token.user_role;
//       if (userRole === "customer") {
//         session.user.client_id = null;
//         session.user.customer_id = await role.customer();
//         session.user.user_role = userRole;
//       }
//       if (userRole === "client") {
//         session.user.client_id = await role.client();
//         session.user.customer_id = null;
//         session.user.user_role = userRole;
//       }
  
//       return session;
//     },
//   },
  
//   pages: {
//     signIn: "/login",
//   },
// };





import { validateAndDecodeToken } from "@/utils/validateAndDecodeToken";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  checkClientByEmail,
  checkCustomerByEmail,
  createUserGoogle,
} from "./data-service";
//import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        //params: { prompt: 'select_account' }
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
          scope: "profile email",
        },
      },
    }),
  ],
  
  trustHost: true,
  callbacks: {
    async authorized({ auth, request }) {
      console.log("AAAAHILL SIGN UP WITH  GOOOGLE ");

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
        ? `/${user.user_role === "client" ? "client/" + user[`client_id`] : "candidate/" + user[`customer_id`]}`
        : null;

      const credentialUserRedirectPath = credentialUser?.id
        ? `/${credentialUser.user_role === "client" ? credentialUser.user_role : "candidate"}/${credentialUser.id}`
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
      console.log("////////////////////", user);
      const role = {
        customer: checkCustomerByEmail,
        client: checkClientByEmail,
      };
    
      const userRoleCookie = cookies().get("user_role");
      console.log(userRoleCookie)
      const userRole = userRoleCookie ? userRoleCookie.value : "customer";
    
      const { existingUser } = await role[userRole](user.email);
      if (!existingUser) {
        let stripeData; // Ensure `stripeData` is declared in scope
    
        // Call the Stripe customer creation API
        const stripeResponse = await fetch(
          `${process.env.NEXTAUTH_URL}/api/create-customer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
            }),
          },
        );
        stripeData = await stripeResponse.json();
        if (userRole === "client") {
    
          if (stripeResponse.status !== 200) {
            throw new Error(stripeData.error);
          }
    
          console.log(
            "Stripe customer created successfully:",
            stripeData.customer,
          );
        }
    
        // Proceed with the rest of the signup process
        const result = await createUserGoogle({
          email: user.email,
          name: user.name,
          user_role: userRole,
          method: "signup",
        });
    
        console.log("USER ROLE IS: ", userRole);
        let createAccountResponse, createAccountData;
    
        if (userRole === "client") {
          createAccountResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/create-stripe-account`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                client_id: result.data.client_id,
                stripe_id: stripeData?.customer?.id, // Use optional chaining
              }),
            },
          );
        } else {
          createAccountResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/create-customer-stripe-account`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                customer_id: result.data.customer_id,
                stripe_id: stripeData?.customer?.id, // Use optional chaining
              }),
            },
          );
        }
    
        createAccountData = await createAccountResponse.json();
    
        if (createAccountResponse.status !== 200) {
          throw new Error(createAccountData.error);
        }
    
        console.log(
          "Stripe account created successfully:",
          createAccountData,
        );
      }
    
      return true;
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

