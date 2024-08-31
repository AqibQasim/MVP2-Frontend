import DashboardSection from "@/components/DashboardSection";
import HeadingSmall from "@/components/HeadingSmall";
import Hr from "@/components/Hr";
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
    <>
      <DashboardSection
        paragraph={`Hey ${client.name} here's your new`}
        heading="Recommendations"
      >
        <p>child</p>
      </DashboardSection>
    </>
  );
}
