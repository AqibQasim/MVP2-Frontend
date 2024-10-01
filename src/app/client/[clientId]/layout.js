import ClientDashboardSideNav from "@/components/ClientDashboardSideNav";
import ClientHeader from "@/components/ClientHeader";
import ClientLogout from "@/components/ClientLogout";
import { getClientById } from "@/lib/data-service";
import { PAGE_HEIGHT_FIX } from "@/utils/utility";

import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";
// import { useRouter } from "next/router";

async function layout({ children, params }) {
  const clientId = params.clientId;
  console.log("clientId", clientId);
  const session = await auth();

  // const router = useRouter();

  // useEffect(() => {
  //   // Check if user is logged in
  //   const isLoggedIn = localStorage.getItem("MVP_CLIENT_LOGGEDIN");

  //   // If not logged in, redirect to login Page
  //   if (!isLoggedIn) {
  //     // router.push("/login");
  //     window.location.href("/login");
  //   }
  // }, [router]);

  const client = await getClientById(clientId);

  return (
    <div
      className={`${PAGE_HEIGHT_FIX} grid grid-cols-[17.0625rem_1fr] grid-rows-[max-content_1fr] gap-[6px] overflow-hidden`}
    >
      <header className="rounded-4xl bg-neutral-white p-4">
        <ClientHeader client={client} />
      </header>
      <aside className="col-start-1 row-span-2 row-start-1 rounded-4xl bg-neutral-white p-6">
        <ClientDashboardSideNav clientId={clientId} />
        {session?.user ? <SignOutButton /> : <ClientLogout />}
      </aside>
      {/* <AuthCheck>
        <div className="body-scroll overflow-y-scroll rounded-3xl bg-transparent">
          {" "}
          {children}{" "}
        </div>
      </AuthCheck> */}
      <div className="body-scroll overflow-y-scroll rounded-3xl bg-transparent">
        {" "}
        {children}{" "}
      </div>
    </div>
  );
}

export default layout;
