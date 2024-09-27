import CandidateDashboardNavLinks from "@/components/CandidateDashboardNavLinks";
import Logo from "./Logo";

function CandidateDashboardSideNav({ candidateId }) {
  return (
    <div className="space-y-12">
      <Logo />
      <CandidateDashboardNavLinks candidateId={candidateId} />
    </div>
  );
}

export default CandidateDashboardSideNav;
