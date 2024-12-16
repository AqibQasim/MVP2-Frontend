"use client";
import AdminCandidatesTable from "@/components/AdminCandidatesTable";
import EmptyScreen from "@/components/EmptyScreen";
import ReportOverlay from "@/components/ReportOverlay";
// import WithAdminAuth from "@/components/WithAdminAuth";
import WithAdminAuth from "@/components/WithAdminAuth";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { fetchRecommendedCandidates } from "@/lib/data-service";
import { useCallback, useEffect, useState } from "react";

const metadata = {
  title: "Candidates",
};

//export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

const Page = async () => {
  // let candidates = [];
  const [candidates, setCandidates] = useState([])
  const [isReportOverlayOpened, setIsReportOverlayOpened] = useState(false);
  const [selected_candidate_id, setSelectedCandidateId] = useState(null);
  const [candidateReport, setCandidateReport] = useState(null);
  const [error,setError]= useState(null)

  const handleCloseOverlay = () => {
    setIsReportOverlayOpened(false);
    //setSuccessAcknowledge(false);
  };

  const getCandidateResult = useCallback(() => {
    const payload = {
      endpoint: `get-customer-result?customer_id=${selected_candidate_id}`,
      method: "GET",
    };
    mvp2ApiHelper(payload).then((result) => {
      if (result) setCandidateReport(result?.data?.data);
    });
  },[selected_candidate_id]);

  const getRecommendedCandidates= useCallback(async()=>{
    const { data, error } = await fetchRecommendedCandidates();
    if (error) setError(error);
    else setCandidates(data?.data)
  },[]);

  useEffect(() => {
    getCandidateResult();
    getRecommendedCandidates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected_candidate_id]);

  // try {
  //   const { data, error } = await fetchRecommendedCandidates();
  //   if (error) throw new Error(error);
  //   console.log(data);
  //   candidates = data?.data;
  // } catch (err) {
  //   return <div>{err}</div>;
  // }

  if (!candidates) {
    return <EmptyScreen className={"h-[32.188rem]"} />;
  }

  return (
    <div className="overflow-y-hidden">
      <AdminCandidatesTable
        totalCandidates={candidates?.length}
        isReportOverlayOpened={isReportOverlayOpened}
        setIsReportOverlayOpened={setIsReportOverlayOpened}
        setSelectedCandidateId={setSelectedCandidateId}
        onClick={() => {
          setIsReportOverlayOpened(true);
        }}
        candidates={candidates}
        role="admin"
      />

      {isReportOverlayOpened && (
        <ReportOverlay
          reportOverlay={isReportOverlayOpened}
          onClose={handleCloseOverlay}
          selectedCandidate={candidateReport}
        />
      )}
    </div>
  );
};

export default WithAdminAuth(Page);
