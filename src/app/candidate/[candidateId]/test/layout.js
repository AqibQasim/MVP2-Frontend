import CandidateDashboardSideNav from "@/components/CandidateDashboardSideNav"
import CandidateHeader from "@/components/CandidateHeader";
import { PAGE_HEIGHT_FIX } from "@/utils/utility";

function layout({ children, params }) {
  const candidateId = params.candidateId;
  console.log("candidateId here ", candidateId);
  return (
    <div
      className={`${PAGE_HEIGHT_FIX} grid !h-[calc(100dvh-2.25rem)] grid-cols-[17.0625rem_1fr] grid-rows-[max-content_1fr] gap-[6px] overflow-hidden`}
    >
        {children}
    </div>
  );
}

export default layout;
