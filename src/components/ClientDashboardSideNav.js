import {
  getAllRecommendedCandidates,
  getClientById,
  getClientJobs,
} from "@/lib/data-service";
import ClientDashboardNavLinks from "./ClientDashboardNavLinks";
import Logo from "./Logo";

const filter = "accept";

async function ClientDashboardSideNav({ clientId }) {
  const [client, recommendedCandidates, jobs] = await Promise.all([
    getClientById(clientId),
    getAllRecommendedCandidates(clientId),
    getClientJobs(clientId),
  ]);
  const { data: hiredTalents, error } = await getAllRecommendedCandidates(
    clientId,
    filter,
  );

  return (
    <div className="space-y-12">
      <Logo />
      <ClientDashboardNavLinks
        numJobs={jobs.length}
        numRecommended={recommendedCandidates.data.length}
        numHired={hiredTalents.length}
      />
    </div>
  );
}

export default ClientDashboardSideNav;
