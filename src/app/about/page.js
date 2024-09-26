import Heading from "@/components/Heading";
import LoggedInUserTest from "@/components/LoggedInUserTest";
import SignOutButton from "@/components/SignoutButton";

export const metadata = {
  title: "About",
};

function Page() {
  return (
    <>
      <Heading>About Page</Heading>
      <p className="font-lufga text-4xl font-black text-primary">something</p>
      <p className="text-4xl text-primary-tint-60">something</p>
      <LoggedInUserTest />
      <SignOutButton />
    </>
  );
}

export default Page;
