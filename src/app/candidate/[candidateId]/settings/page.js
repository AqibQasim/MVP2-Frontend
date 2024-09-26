import CandidateSettings from "@/components/CandidateSettings";
import { getCandidateById } from "@/lib/data-service";

function Page({ params }) {
  const candidateId = params.candidateId;
  const candidate = getCandidateById(candidateId);

  console.log("candidate id  is: ", candidateId);
  return (
    <>
      <CandidateSettings candidate={candidate} />
    </>
  );
}

export default Page;
