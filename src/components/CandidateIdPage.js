"use client";
import CandidateEvaluateYourselfCard from "@/components/CandidateEvaluateYourselfCard";
import CandidateReportCard from "@/components/CandidateReportCard";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { useEffect, useState } from "react";

export default function CandidateIdPage({ candidateId }) {
  const [candidateReport, setCandidateReport] = useState(null);

  const getCandidateRsult = () => {
    const payload = {
      endpoint: `get-customer-result?customer_id=${candidateId}`,
      method: "GET",
    };
    mvp2ApiHelper(payload).then((result) => {
      if (result) setCandidateReport(result?.data?.data);
    });
  };

  console.log(candidateReport);

  useEffect(() => {
    getCandidateRsult();
  }, [candidateId]);

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
