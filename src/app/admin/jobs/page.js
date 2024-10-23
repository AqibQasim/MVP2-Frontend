"use client";

import AdminJobsList from "@/components/AdminJobsList";
import EmptyScreen from "@/components/EmptyScreen";
import WithAdminAuth from "@/components/WithAdminAuth";
import { getJobs } from "@/lib/data-service";

const metadata = {
  title: "Jobs",
};

// export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

async function Page() {
  let jobs = [];
  try {
    const { data, error } = await getJobs();
    if (error) throw new Error(error);
    jobs = data;
  } catch (err) {
    return <div>Failed to load jobs: {err.message}</div>;
  }

  console.log("data of jobs", jobs);

  if (jobs && jobs?.length === 0) {
    return <EmptyScreen className={"h-[32.188rem]"} />;
  }

  return <AdminJobsList jobs={jobs} />;
}

export default WithAdminAuth(Page);
