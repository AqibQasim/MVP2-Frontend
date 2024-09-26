import CandidateIdPage from "@/components/CandidateIdPage";
import CandidateProfileInfo from "@/components/CandidateProfileInfo";
import { getCandidate, getCandidates } from "@/lib/data-service";

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