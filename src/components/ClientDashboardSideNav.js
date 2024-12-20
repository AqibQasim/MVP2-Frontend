import { getAllRecommendedCandidates, getClientJobs } from "@/lib/data-service";
import ClientDashboardNavLinks from "./ClientDashboardNavLinks";
import Logo from "./Logo";
import Logout from "./Logout";

const filter = "accept";

async function ClientDashboardSideNav({ clientId }) {
  const [recommendedCandidates, jobs] = await Promise.all([
    getAllRecommendedCandidates(clientId,"all","referred"),
    getClientJobs(clientId),
  ]);
  const { data: hiredTalents, error } = await getAllRecommendedCandidates(
    clientId,
    filter,
  );

  return (
    <div className="h-full space-y-12">
      <Logo />
      <ClientDashboardNavLinks
        numJobs={jobs.length}
        numRecommended={
          recommendedCandidates.data?.filter(
            (v) => v.customer?.talent_status === "referred",
          )?.length
        }
        numHired={
          hiredTalents?.filter(
            (v) =>
              v.customer.talent_status === "hired" ||
              v.customer.talent_status === "trial",
          )?.length
        }
      >
        <Logout />
      </ClientDashboardNavLinks>
    </div>
  );
}

export default ClientDashboardSideNav;
