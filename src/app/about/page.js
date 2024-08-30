import Heading from "@/component/Heading";

export const metadata = {
  title: "About",
};

function page() {
  return (
    <>
      <Heading>About page</Heading>
      <p className="text-4xl text-primary ">something</p>
      <p className="text-4xl text-primary-tint-60">something</p>
    </>
  );
}

export default page;
