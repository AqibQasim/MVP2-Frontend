import ClientEmployeesTable from "@/components/ClientEmployeesTable";
import ClientJobsOverviewTable from "@/components/ClientJobsOverviewTable";
import ClientRecommendationCard from "@/components/ClientRecommendationCard";
import { getClientById, getClients } from "@/lib/data-service";

// export async function generateMetadata({ params }) {
//   const client = await getClientById(params.clientId);
//   return { title: `Client ${client?.name}` };
// }

// export async function generateStaticParams() {
//   const clients = await getClients();
//   const ids = clients.map((client) => ({ clientId: String(client.client_id) }));
//   return ids;
// }

export default async function Page({ params }) {
  const client = await getClientById(params.clientId);

  return (
    <div className="space-y-2">
      <ClientRecommendationCard client={client} />
      <ClientJobsOverviewTable client_id={params.clientId}/>
      <ClientEmployeesTable />
    </div>
  );
}
