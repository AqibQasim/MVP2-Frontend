"use client";
import CandidateEvaluateYourselfCard from "@/components/CandidateEvaluateYourselfCard";
import CandidateReportCard from "@/components/CandidateReportCard";
import ReportOverlay from "@/components/ReportOverlay";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { useEffect, useState } from "react";

export default function CandidateIdPage({ candidate }) {
  const [candidateReport, setCandidateReport] = useState(null);
  const [isReportOverlayOpened, setIsReportOverlayOpened] = useState(false);

  console.log("overlayyyyy: ", isReportOverlayOpened);

  const getCandidateResult = () => {
    const payload = {
      endpoint: `get-customer-result?customer_id=${candidate?.customer_id}`,
      method: "GET",
    };
    mvp2ApiHelper(payload).then((result) => {
      if (result) setCandidateReport(result?.data?.data);
    });
  };

  useEffect(() => {
    getCandidateResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidate?.customer_id]);

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
