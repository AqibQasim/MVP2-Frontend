"use client";

import AdminCandidatesClientsHiringTable from "@/components/AdminCandidatesClientsHiringTable";
import WithAdminAuth from "@/components/WithAdminAuth";
import AdminJobsList from "@/components/AdminJobsList";
import AdminClientsTable from "@/components/AdminClientsTable";
import AdminCandidatesTable from "@/components/AdminCandidatesTable";
import ReportOverlay from "@/components/ReportOverlay";
import AdminStates from "@/components/AdminStates";
import React, { useCallback, useEffect, useState } from "react";
import {
  fetchCandidatesJobStatus,
  getJobs,
  getClients,
  fetchRecommendedCandidates,
} from "@/lib/data-service";

async function Page() {
  const [candidateJobStatus, setCandidateJobStatus] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [clients, setClients] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [isReportOverlayOpened, setIsReportOverlayOpened] = useState(false);
  //const [selected_candidate_id, setSelectedCandidateId] = useState(null);
  const [candidateReport, setCandidateReport] = useState(null);
  const [candidateLength, setCandidateLength] = useState(null);
  const [clientLength, setClientLength] = useState(null);
  const [jobsLength, setJobsLength] = useState(null);

  // const handleCloseOverlay = useCallback(() => {
  //   setIsReportOverlayOpened(false);
  // }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const [statusData, jobsData, clientsData, candidatesData] =
          await Promise.all([
            fetchCandidatesJobStatus("hired-trial-interviewing"),
            getJobs(),
            getClients(),
            fetchRecommendedCandidates(),
          ]);

        setCandidateJobStatus(statusData?.data || []);
        setJobsLength(jobsData?.data?.length || 0);
        setJobs(
          jobsData?.data
            ?.filter((job) => job.job_status === "open")
            .slice(0, 3),
        );
        setClientLength(clientsData?.data?.length || 0);
        setClients(clientsData?.data?.slice(0, 3));
        setCandidateLength(candidatesData?.data?.data?.length || 0);
        setCandidates(
          candidatesData?.data?.data
            ?.filter((c) => c?.customer?.talent_status === "open")
            .slice(0, 3),
        );
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
    loadData();
  }, []);

  return (
    <div className="h-fit space-y-3">
      <AdminStates />
      <AdminJobsList jobs={jobs} totalJobs={jobsLength} role="dashboard" />
      <AdminClientsTable
        clients={clients}
        totalClients={clientLength}
        role="dashboard"
      />
      <AdminCandidatesTable
        totalCandidates={candidateLength}
        // isReportOverlayOpened={isReportOverlayOpened}
        // setIsReportOverlayOpened={setIsReportOverlayOpened}
        // setSelectedCandidateId={setSelectedCandidateId}
        candidates={candidates}
        role="dashboard"
      />
      {isReportOverlayOpened && (
        <ReportOverlay
          reportOverlay={isReportOverlayOpened}
          onClose={handleCloseOverlay}
          selectedCandidate={candidateReport}
        />
      )}
      <AdminCandidatesClientsHiringTable
        totalHirings={candidateJobStatus?.data?.length}
        candidateJobStatus={candidateJobStatus}
      />
    </div>
  );
}

export default WithAdminAuth(Page);
