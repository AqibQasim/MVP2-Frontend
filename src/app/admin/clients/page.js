import AdminClientsTable from "@/components/AdminClientsTable";
import { getClients } from "@/lib/data-service";

export const metadata = {
  title: "Clients",
};

export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

async function Page() {
  try {
    const clients = await getClients();
    if (!clients || !clients.data || clients.data.length === 0) {
      throw new Error("No clients found");
    }
    return <AdminClientsTable clients={clients.data} />;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return <div>Failed to load clients.</div>;
  }
}

export default Page;
