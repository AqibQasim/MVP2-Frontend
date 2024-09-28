import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

async function Page() {
  const session = await auth();
  if (!session?.user) redirect("/");
  if (session?.user) redirect(`/candidate/${session?.user?.customer_id}`);
  return notFound();
}

export default Page;
