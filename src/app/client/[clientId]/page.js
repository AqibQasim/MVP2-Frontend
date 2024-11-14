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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default async function Page({ params }) {
  const router = useRouter();
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
    const isLoggedIn = localStorage.getItem("MVP_CLIENT_LOGGEDIN") === "true";

    if (!isLoggedIn && router.pathname !== "/login") {
      router.replace("/login");
    } else if (isLoggedIn && router.pathname === "/login") {
      router.replace(`/client/${params.clientId}`);
    }
  }, [router]);

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
      {recommendedCandidates?.customer &&
        recommendedCandidates?.job_postings && (
          <ClientRecommendationCard
            admin_hourly_rate={recommendedCandidates?.hourly_rate}
            client={client}
            recommendedCandidate={recommendedCandidates?.customer}
            recommendedForJob={recommendedCandidates?.job_postings}
          />
        )}
      {jobs && <ClientJobsOverviewTable jobs={jobs} />}
      {<ClientEmployeesTable client_id={params?.clientId} />}
    </div>
  );
}
