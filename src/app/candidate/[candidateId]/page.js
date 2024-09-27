import CandidateIdPage from "@/components/CandidateIdPage";
import { getCandidate } from "@/lib/data-service";

async function Page({ params }) {
  const { data: candidate } = await getCandidate(params.candidateId);

  return (
    <div>
      <CandidateIdPage candidate={candidate} />
    </div>
  );
}

export default Page;
