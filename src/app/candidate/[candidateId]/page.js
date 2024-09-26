import CandidateIdPage from "@/components/CandidateIdPage";
import CandidateProfileInfo from "@/components/CandidateProfileInfo";
import { getCandidateById, getCandidates } from "@/lib/data-service";

async function page({ params }) {
  const candidates = await getCandidates();
  const candidate = await getCandidateById(params.candidateId);
  console.log("Candidates on Page", candidates);

  console.log("candidates are :", candidate);

  return (
    <div>
      <CandidateIdPage candidate={candidate} candidateId={params.candidateId} />
    </div>
  );
}

export default page;
