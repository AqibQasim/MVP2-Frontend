import AdminJobsList from "@/components/AdminJobsList";
import { getJobs } from "@/lib/data-service";

export const metadata = {
  title: "Jobs",
};

export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

async function page() {
  const jobs = await getJobs();
  return (
    <>
      
    </>
  );
}

export default page;
