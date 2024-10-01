import AdminClientsTable from "@/components/AdminClientsTable";
import { getClients } from "@/lib/data-service";

export const metadata = {
  title: "Clients",
};

export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

export default async function Page() {
  const { data: clients, error } = await getClients();

  if (error) throw new Error(error);

  return <AdminClientsTable clients={clients} />;
}
