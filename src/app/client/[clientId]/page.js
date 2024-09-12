import ClientPage from "@/components/ClientPage";
import { getClientById, getClients } from "@/lib/data-service";

export async function generateMetadata({ params }) {
  const client = await getClientById(params.clientId);
  return { title: `Client ${client?.name}` };
}

export async function generateStaticParams() {
  const clients = await getClients();
  const ids = clients.map((client) => ({ clientId: String(client.client_id) }));
  return ids;
}

export default async function Page({ params }) {
  return (
    <>
      <ClientPage params={params} />
    </>
  );
}
