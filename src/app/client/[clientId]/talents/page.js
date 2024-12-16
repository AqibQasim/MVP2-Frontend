import ClientTalentsTable from "@/components/ClientTalentsTable";
import { getAllRecommendedCandidates } from "@/lib/data-service";

async function Page({ params }) {
  
  return (
    <>
      <ClientTalentsTable  />
    </>
  );
}

export default Page;
