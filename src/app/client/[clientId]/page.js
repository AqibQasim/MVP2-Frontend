import ClientEmployeesTable from "@/components/ClientEmployeesTable";
import ClientJobsOverviewTable from "@/components/ClientJobsOverviewTable";
import ClientRecommendationCard from "@/components/ClientRecommendationCard";
import {
  getAllRecommendedCandidates,
  getClientById,
  getClientJobs,
  getRecommendedCandidateOfClient,
} from "@/lib/data-service";

export default async function Page({ params }) {
  const filter = "accept";
  const [client, recommendedCandidates, jobs, hiredCandidates] =
    await Promise.all([
      getClientById(params.clientId),
      getRecommendedCandidateOfClient(params.clientId),
      getClientJobs(params.clientId),
      getAllRecommendedCandidates(params.clientId, filter),
    ]);
  const { data: hiredTalents, error } = hiredCandidates;

  return (
    <div className="space-y-2">
      {/* {showResponseMessage && (
        <ErrorIndicator showErrorMessage={showResponseMessage} 
        msgText={"Your Interview with the client has ended. Do you want to accept this client for trial?"} />
      )} */}
      <ClientRecommendationCard
        client={client}
        recommendedCandidate={recommendedCandidates.customer}
        recommendedForJob={recommendedCandidates.job_postings}
      />
      <ClientJobsOverviewTable jobs={jobs} />
      {
        (hiredCandidates?.status === 200 && hiredCandidates?.data?.length > 0) &&
        <ClientEmployeesTable hiredCandidates={hiredTalents} />
      }
    </div>
  );
}
