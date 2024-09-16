import AdminClientsTable from "@/components/AdminClientsTable";
import { getClients } from "@/lib/data-service";

export const metadata = {
  title: "Clients",
};

export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

async function page() {
  const clients = await getClients();

  return <AdminClientsTable clients={clients.data} />;
}

export default page;
