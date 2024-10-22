"use client";
import AdminClientsTable from "@/components/AdminClientsTable";
import EmptyScreen from "@/components/EmptyScreen";
import WithAdminAuth from "@/components/WithAdminAuth";
import { getClients } from "@/lib/data-service";

// const metadata = {
//   title: "Clients",
// };

// export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

async function Page() {
  let clients = [];
  try {
    const { data, error } = await getClients();
    if (error) throw new Error(error);
    clients = data;
  } catch (err) {
    return <EmptyScreen className={"h-[32.188rem]"} />;
  }

  return <AdminClientsTable clients={clients} />;
}

export default WithAdminAuth(Page);