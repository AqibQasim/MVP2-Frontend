"use client";
import CandidateEvaluateYourselfCard from "@/components/CandidateEvaluateYourselfCard";
import CandidateReportCard from "@/components/CandidateReportCard";
import ReportOverlay from "@/components/ReportOverlay";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [candidateReport, setCandidateReport] = useState(null);
  const [isReportOverlayOpened, setIsReportOverlayOpened] = useState(false);

  console.log("overlayyyyy: ",isReportOverlayOpened)

  const getCandidateResult = () => {
    const payload = {
      endpoint: `get-customer-result?customer_id=${params.candidateId}`,
      method: "GET",
    };
    mvp2ApiHelper(payload).then((result) => {
      if (result) setCandidateReport(result?.data?.data);
    });
  };

  useEffect(() => {
    getCandidateResult();
  }, [params.candidateId]);

  // Function to handle opening the overlay
  const handleOpenOverlay = () => {
    setIsReportOverlayOpened(true);
  };

  // Function to handle closing the overlay
  const handleCloseOverlay = () => {
    setIsReportOverlayOpened(false);
  };

  return (
    <div>
      {!candidateReport ? (
        <CandidateEvaluateYourselfCard />
      ) : (
        <div>
          <CandidateReportCard
            candidateReport={candidateReport}
            handleOpenOverlay={handleOpenOverlay} // Pass the function to open overlay
          />
          {isReportOverlayOpened && (
            <ReportOverlay
            reportOverlay={isReportOverlayOpened}
              onClose={handleCloseOverlay} // Pass the function to close overlay
              selectedCandidate={candidateReport}
            />
          )}
        </div>
      )}
    </div>
  );
}
