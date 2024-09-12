import AdminClientsTable from "@/components/AdminClientsTable";
import { getClients } from "@/lib/data-service";

export const metadata = {
  title: "Clients",
};

async function page() {
  const clients = await getClients();

  return (
    <div>
      <AdminClientsTable clients={clients} />
    </div>
  );
}

export default page;
