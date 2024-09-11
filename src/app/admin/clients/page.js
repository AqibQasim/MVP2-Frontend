import AdminClientsTable from "@/components/AdminClientsTable";
import { getClients } from "@/lib/data-service";

async function page() {
  const clients = await getClients();
  console.log("clients:", clients);
  return (
    <div>
      <AdminClientsTable />
    </div>
  );
}

export default page;
