import ClientRecommendedTable from "@/components/ClientRecommendedTable";
import { getAllRecommendedCandidates } from "@/lib/data-service";

async function Page({ params }) {
  const clientId = params.clientId;
  console.log("params: ", clientId);
  const { data: recommendedCandidatesForJobs, error } =
    await getAllRecommendedCandidates(clientId,"all","interviewing");

  if (error) console.log("Error: getting recommeneded Candidates: ", error);
  if (error)
    return (
      <>
        <h1>Error: getting recommeneded Candidates</h1> <p> {error} </p>
      </>
    );

  return (
    <>
      <ClientRecommendedTable
        recommendedCandidates={recommendedCandidatesForJobs}
      />
    </>
  );
}

export default Page;
