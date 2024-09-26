import CandidateIdPage from "@/components/CandidateIdPage";
import { getCandidates } from "@/lib/data-service";

async function Page({ params }) {
  const candidates = await getCandidates();
  console.log("Candidates on Page", candidates);

  return (
    <div>
      <CandidateIdPage candidateId={params.candidateId} />
    </div>
  );
}

export default Page;
