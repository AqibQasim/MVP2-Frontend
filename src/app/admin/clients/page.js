import AdminClientsTable from "@/components/AdminClientsTable";
import { getClients } from "@/lib/data-service";

export const metadata = {
  title: "Clients",
};

export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

export default async function Page() {
  let clients = [];
  try {
    const { data, error } = await getClients();
    if (error) throw new Error(error);
    clients = data;
  } catch (err) {
    return <div>Failed to load clients: {err.message}</div>;
  }

  return <AdminClientsTable clients={clients} />;
}
