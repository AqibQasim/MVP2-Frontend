"use client";

import AdminJobsList from "@/components/AdminJobsList";
import EmptyScreen from "@/components/EmptyScreen";
import WithAdminAuth from "@/components/WithAdminAuth";
import { getJobs } from "@/lib/data-service";
import { useCallback, useEffect, useState } from "react";

const metadata = {
  title: "Jobs",
};

// export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

async function Page() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    const { data, error } = await getJobs();
    if (error) {
      setError("failed to load jobs: ", error.message);
    } else {
      setJobs(data);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, []);
  // let jobs = [];
  // try {
  //   const { data, error } = await getJobs();
  //   if (error) throw new Error(error);
  //   jobs = data;
  // } catch (err) {
  //   return <div>Failed to load jobs: {err.message}</div>;
  // }

  console.log("data of jobs", jobs);

  if (error) {
    return <div>{error}</div>;
  }

  if (jobs && jobs?.length === 0) {
    return <EmptyScreen className={"h-[32.188rem]"} />;
  }

  return <AdminJobsList totalJobs={jobs?.length} jobs={jobs}    role="admin" />;
}

export default WithAdminAuth(Page);
