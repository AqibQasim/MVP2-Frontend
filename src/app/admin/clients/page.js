import AdminClientsTable from "@/components/AdminClientsTable";
import { getClients } from "@/lib/data-service";

export const metadata = {
  title: "Clients",
};

export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

export default async function Page() {
  const clients = await getClients();

  return <AdminClientsTable clients={clients.data} />;
}
