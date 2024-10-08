import CandidateIdPage from "@/components/CandidateIdPage";
import CandidateProfileInfo from "@/components/CandidateProfileInfo";
import { getCandidateById, getCandidates } from "@/lib/data-service";

async function Page({ params }) {
  //const candidates = await getCandidates();
  const candidate = await getCandidateById(params.candidateId);
  //console.log("Candidates on Page", candidates);

  console.log("candidates are :", candidate);

  return (
    <>
      <CandidateIdPage candidate={candidate} candidateId={params.candidateId}  />
    </>
  );
}

export default Page;
