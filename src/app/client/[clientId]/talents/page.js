import ClientTalentsTable from "@/components/ClientTalentsTable";
import { getAllRecommendedCandidates } from "@/lib/data-service";

async function Page({ params }) {
  const clientId = params.clientId;
  console.log("params: ", clientId);
  const { data: hiredTalents, error } = await getAllRecommendedCandidates(
    clientId,
    "accept",
  );
  if (error) console.log("Error: getting Hired Candidates: ", error);
  console.log("Hired Candidates: ", hiredTalents);
  return (
    <>
      <ClientTalentsTable hiredTalents={hiredTalents} />
    </>
  );
}

export default Page;
