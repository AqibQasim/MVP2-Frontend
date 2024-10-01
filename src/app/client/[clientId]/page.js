"use client";
import ClientEmployeesTable from "@/components/ClientEmployeesTable";
import ClientJobsOverviewTable from "@/components/ClientJobsOverviewTable";
import ClientRecommendationCard from "@/components/ClientRecommendationCard";
import {
  getClientById,
  getClientJobs,
  getRecommendedCandidateOfClient,
} from "@/lib/data-service";
import { useState } from "react";

export default async function Page({ params }) {
  const [client, recommendedCandidates, jobs] = await Promise.all([
    getClientById(params.clientId),
    getRecommendedCandidateOfClient(params.clientId),
    getClientJobs(params.clientId),
  ]);
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
      <ClientEmployeesTable />
    </div>
  );
}
