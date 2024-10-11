import AdminJobsList from "@/components/AdminJobsList";
import { getJobs } from "@/lib/data-service";
// import { useEffect } from "react";

export const metadata = {
  title: "Jobs",
};

export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

async function Page() {
  const { data: jobs, error } = await getJobs();

  // useEffect(() => {
  //   console.log("jobs of data", jobs);
  // }, []);

  console.log("data of jobs", jobs);

  if (error) throw new Error(error);

  return <AdminJobsList jobs={jobs} />;
}

export default Page;
