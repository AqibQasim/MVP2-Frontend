import CandidateDashboardSideNav from "@/components/CandidateDashboardSideNav";
import CandidateHeader from "@/components/CandidateHeader";
import CandidateProfileInfo from "@/components/CandidateProfileInfo";
import { getCandidate, getCandidates } from "@/lib/data-service";
import { PAGE_HEIGHT_FIX } from "@/utils/utility";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   const candidates = await getCandidates();
//   const ids = candidates.map((candidate) => ({
//     candidateId: String(candidate.customer_id),
//   }));

//   return ids;
// }

async function layout({ children, params }) {
  const candidateId = params.candidateId;
  const { data: candidate } = await getCandidate(candidateId);

  // using this until build errors are fixed
  // if (!candidate?.name) notFound();
  console.log("Candidate", candidate);
  const showCandidateInformationForm =
    !candidate?.specialization ||
    !candidate?.commitment ||
    !candidate?.hourly_rate;

  if (showCandidateInformationForm) return <CandidateProfileInfo />;

  console.log("candidateId here ", candidateId);
  console.log("params are : ", params);
  return (
    <div
      className={`${PAGE_HEIGHT_FIX} grid !h-[calc(100dvh-2.25rem)] grid-cols-[17.0625rem_1fr] grid-rows-[max-content_1fr] gap-[6px] overflow-hidden`}
    >
      <header className="rounded-4xl bg-neutral-white p-4">
        <CandidateHeader candidateId={candidateId} />
      </header>
      <aside className="col-start-1 row-span-2 row-start-1 rounded-4xl bg-neutral-white p-6">
        <CandidateDashboardSideNav candidateId={candidateId} />
      </aside>
      <div className="body-scroll overflow-y-scroll rounded-3xl bg-transparent">
        {" "}
        {children}{" "}
      </div>
    </div>
  );
}

export default layout;
