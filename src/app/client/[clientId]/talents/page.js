import ClientTalentsTable from "@/components/ClientTalentsTable";
import { getAllRecommendedCandidates } from "@/lib/data-service";

async function Page({ params }) {
  const clientId = params.clientId;
  console.log("params: ", clientId);
  const filter = "accept";
  const { data: hiredTalents, error } = await getAllRecommendedCandidates(
    clientId,
    filter,
  );
  if (error) console.log("Error: getting Hired Candidates: ", error);
  return (
    <>
      <ClientTalentsTable hiredTalents={hiredTalents} />
    </>
  );
}

export default Page;
