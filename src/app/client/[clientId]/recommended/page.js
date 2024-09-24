import ClientRecommendedTable from "@/components/ClientRecommendedTable";
import { getAllRecommendedCandidates } from "@/lib/data-service";

async function Page({ params }) {
  const clientId = params.clientId;
  console.log("params: ", clientId);
  const { data: recommendedCandidatesForJobs, error } =
    await getAllRecommendedCandidates(clientId);

  if (error) console.log("Error: getting recommeneded Candidates: ", error);

  console.log("on page: ", recommendedCandidatesForJobs);
  return (
    <>
      <ClientRecommendedTable
        recommendedCandidates={recommendedCandidatesForJobs}
      />
    </>
  );
}

export default Page;
