"use client";

import { useCallback, useEffect, useState } from "react";
import CandidatePublicProfile from "@/components/profile/CandidatePublicProfile";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";

function Page({ params }) {
  const [talent, setTalent] = useState(null);
  const [candidateReport, setCandidateReport] = useState(null);

  const customer_id = params?.candidateId;

  const getCandidateResult = useCallback(() => {
    const payload = {
      endpoint: `get-customer-result?customer_id=${customer_id}`,
      method: "GET",
    };
    mvp2ApiHelper(payload).then((result) => {
      if (result) setCandidateReport(result?.data?.data);
    });
  }, [customer_id]);

  useEffect(() => {
    getCandidateResult();
  }, [getCandidateResult]);

  useEffect(() => {
    document.title = "Covental | Candidate profile";
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchTalent() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/customers?customer_id=${customer_id}`,
        );
        const result = await res.json();
        if (result.status !== 200) throw new Error(`Error: ${result.err}`);
        if (isMounted) setTalent(result.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTalent();

    return () => {
      isMounted = false;
    };
  }, [customer_id]);

  if (!talent) {
    return (
      <div className="profile-loading">
        <div className="loader2" />
      </div>
    );
  }

  return (
    <CandidatePublicProfile
      talent={talent}
      customerId={customer_id}
      candidateReport={candidateReport}
    />
  );
}

export default Page;
