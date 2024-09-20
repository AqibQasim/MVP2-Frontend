import ClientEmployeesTable from "@/components/ClientEmployeesTable";
import ClientJobsOverviewTable from "@/components/ClientJobsOverviewTable";
import ClientRecommendationCard from "@/components/ClientRecommendationCard";
import {
  getClientById,
  getRecommendedCandidatesOfClient,
} from "@/lib/data-service";

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
  const [client, recommendedCandidates] = await Promise.all([
    getClientById(params.clientId),
    getRecommendedCandidatesOfClient(params.clientId),
  ]);

  return (
    <div className="space-y-2">
      <ClientRecommendationCard
        client={client}
        recommendedCandidate={recommendedCandidates.customer}
        recommendedForJob={recommendedCandidates.job_postings}
      />
      <ClientJobsOverviewTable client_id={params.clientId} />
      <ClientEmployeesTable />
    </div>
  );
}
