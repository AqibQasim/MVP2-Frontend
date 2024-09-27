import AdminJobsList from "@/components/AdminJobsList";
import { getJobs } from "@/lib/data-service";

export const metadata = {
  title: "Jobs",
};

export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

async function Page() {
  try {
    const jobs = await getJobs();
    if (!jobs || jobs.length === 0) {
      throw new Error("No jobs found");
    }
    return <AdminJobsList jobs={jobs} />;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return <div>Failed to load jobs.</div>;
  }
}

export default Page;
