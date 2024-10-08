import CandidateDashboardNavLinks from "@/components/CandidateDashboardNavLinks";
import Logo from "./Logo";
import Logout from "./Logout";

function CandidateDashboardSideNav({ candidateId }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="pt-6">
        {" "}
        {/* Adds padding at the top */}
        <Logo />
      </div>
      <div className="mt-8 flex-grow">
        <CandidateDashboardNavLinks candidateId={candidateId} />
      </div>
      <div className="mb-24">
        {" "}
        {/* Adds margin from the bottom */}
        <Logout />
      </div>
    </div>
  );
}

export default CandidateDashboardSideNav;
