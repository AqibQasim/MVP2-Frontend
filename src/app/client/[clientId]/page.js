import ClientEmployeesTable from "@/components/ClientEmployeesTable";
import ClientJobsOverviewTable from "@/components/ClientJobsOverviewTable";
import ClientRecommendationCard from "@/components/ClientRecommendationCard";
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
  const client = await getDummyClientById(params.clientId);

  return (
    <div className="space-y-2">
      <ClientRecommendationCard client={client} />
      <ClientJobsOverviewTable />
      <ClientEmployeesTable />
    </div>
  );
}
