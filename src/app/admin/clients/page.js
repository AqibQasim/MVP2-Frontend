import AdminClientsTable from "@/components/AdminClientsTable";
import { getClients } from "@/lib/data-service";

export const metadata = {
  title: "Clients",
};

async function page() {
  const clients = await getClients();

  return <AdminClientsTable clients={clients} />;
}

export default page;
