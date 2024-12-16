"use client";

import CandidateList from "@/components/CandidateList";
import WithAdminAuth from "@/components/WithAdminAuth";

async function Page() {
  return (
    <>
      <CandidateList />
    </>
  );
}

export default WithAdminAuth(Page);
