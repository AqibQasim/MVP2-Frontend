"use client";
// import { auth } from "@/lib/auth";
import { useAuth } from "./AuthContext";
import Heading from "./Heading";

async function LoggedInUserTest() {
  // this makes route dynamic as it reads cookies that can only be known at run time
  // const session = await auth();

  // not this part
  const session = useAuth();
  if (!session?.user) return null;

  const {
    user: { name, email },
  } = session;
  console.log(session);
  return (
    <div>
      <Heading className="fon !text-3xl">Test user</Heading>
      <p>Name: {name} </p>
      <p>Email: {email} </p>
    </div>
  );
}

export default LoggedInUserTest;
