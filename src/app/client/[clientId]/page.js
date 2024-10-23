"use client";
import ClientEmployeesTable from "@/components/ClientEmployeesTable";
import ClientEmptyScreen from "@/components/ClientEmptyScreen";
import ClientJobsOverviewTable from "@/components/ClientJobsOverviewTable";
import ClientRecommendationCard from "@/components/ClientRecommendationCard";
import DashboardSection from "@/components/DashboardSection";
import EmptyScreen from "@/components/EmptyScreen";
import {
  getAllRecommendedCandidates,
  getClientById,
  getClientJobs,
  getRecommendedCandidateOfClient,
} from "@/lib/data-service";
import { useEffect, useState } from "react";

export default async function Page({ params }) {
  const filter = "accept";
  const [client, setClient] = useState(null);
  const [recommendedCandidates, setRecommendedCandidates] = useState(null);
  const [jobs, setJobs] = useState(null);

  // const [client, recommendedCandidates, jobs] =
  //   await Promise.all([
  //     getClientById(params.clientId),
  //     getRecommendedCandidateOfClient(params.clientId),
  //     getClientJobs(params.clientId),
  //   ]);

  // const { data: hiredTalents, error } = hiredCandidates;
  // console.log(hiredTalents)

  useEffect(() => {
    getClientById(params.clientId).then((v) => {
      setClient(v);
    });
    getRecommendedCandidateOfClient(params.clientId).then((v) => {
      setRecommendedCandidates(v);
    });
    getClientJobs(params.clientId).then((v) => {
      setJobs(v);
    });
  }, []);

  if (
    !recommendedCandidates?.customer &&
    !recommendedCandidates?.job_postings &&
    jobs &&
    jobs?.length === 0
  ) {
    // return <EmptyScreen className={'h-full'}/>
    return (
      <DashboardSection paragraph="" heading="">
        {" "}
        <ClientEmptyScreen />{" "}
      </DashboardSection>
    );
  }

  return (
    <div className="space-y-2">
      {/* {showResponseMessage && (
        <ErrorIndicator showErrorMessage={showResponseMessage} 
        msgText={"Your Interview with the client has ended. Do you want to accept this client for trial?"} />
      )} */}
      {recommendedCandidates?.customer &&
        recommendedCandidates?.job_postings && (
          <ClientRecommendationCard
            client={client}
            recommendedCandidate={recommendedCandidates?.customer}
            recommendedForJob={recommendedCandidates?.job_postings}
          />
        )}
      {jobs && <ClientJobsOverviewTable jobs={jobs} />}
      {
        <ClientEmployeesTable client_id={params?.clientId} />
        // (hiredCandidates?.status === 200 && hiredCandidates?.data?.length > 0) &&
        // <ClientEmployeesTable hiredCandidates={hiredCandidates?.data} />
      }
    </div>
  );
}
