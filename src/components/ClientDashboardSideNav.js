import { getClientJobs } from "@/lib/data-service";
import ClientDashboardNavLinks from "./ClientDashboardNavLinks";
import Logo from "./Logo";

async function ClientDashboardSideNav({ clientId }) {
  const job = await getClientJobs(clientId);

  return (
    <div className="space-y-12">
      <Logo />
      <ClientDashboardNavLinks numberOfJobs={job.length} />
    </div>
  );
}

export default ClientDashboardSideNav;
