import GoogleLogout from "@/components/GoogleLogout";
import Heading from "@/components/Heading";
import LoggedInUserTest from "@/components/LoggedInUserTest";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "About",
};

async function Page() {
  const session = await auth();
  console.log(session);
  return (
    <>
      <Heading>About Page</Heading>
      <p className="font-lufga text-4xl font-black text-primary">something</p>
      <p className="text-4xl text-primary-tint-60">something</p>
      <LoggedInUserTest />
      <GoogleLogout />
    </>
  );
}

export default Page;
