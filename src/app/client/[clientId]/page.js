import ClientPage from "@/components/ClientPage";
import { getDummyClientById, getDummyClients } from "@/lib/tempData";

export async function generateMetadata({ params }) {
  const {
    company: { name },
  } = await getDummyClientById(params.clientId);
  return { title: `Company ${name}` };
}

export async function generateStaticParams() {
  const clients = await getDummyClients();
  const ids = clients.map((client) => ({ cabinId: String(client.id) }));
  return ids;
}

export default async function Page({ params }) {
  return (
    <>
      <ClientPage params={params} />
    </>
  );
}
