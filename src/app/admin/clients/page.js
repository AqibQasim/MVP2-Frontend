import AdminClientsTable from "@/components/AdminClientsTable";
import EmptyScreen from "@/components/EmptyScreen";
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
    return <EmptyScreen className={'h-[32.188rem]'}/>
  }

  return <AdminClientsTable clients={clients} />;
}
