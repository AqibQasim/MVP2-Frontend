"use client";
import CandidateEvaluateYourselfCard from "@/components/CandidateEvaluateYourselfCard";
import CandidatePage from "@/components/CandidatePage";
import CandidateReportCard from "@/components/CandidateReportCard";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { getDummyClientById, getDummyClients } from "@/lib/tempData";
import { useCallback, useEffect, useState } from "react";

export default function Page({ params }) {
  const [candidateReport, setCandidateReport] = useState(null);

  const getCandidateRsult = () => {
    const payload = {
      endpoint: `get-customer-result?customer_id=${params.candidateId}`,
      method: "GET",
    };
    mvp2ApiHelper(payload).then((result) => {
      if (result) setCandidateReport(result?.data?.data);
    });
  };

  console.log(candidateReport);

  useEffect(() => {
    getCandidateRsult();
  }, [params.candidateId]);

  return (
    <>
      {!candidateReport ? (
        <CandidateEvaluateYourselfCard />
      ) : (
        <CandidateReportCard candidateReport={candidateReport} />
      )}
      {/* <CandidatePage params={params} /> */}
    </>
  );
}
