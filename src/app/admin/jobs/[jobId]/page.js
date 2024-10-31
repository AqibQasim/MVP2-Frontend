"use client";
import AdminJobViewById from "@/components/AdminJobViewById";
import JobViewById from "@/components/JobViewById";
import { fetchAdminJob, fetchClientJob } from "@/lib/data-service";
import { cityTimezoneOffset } from "@/utils/cityTimezoneOffset";
import { useSearchParams } from "next/navigation";

async function Page({ params }) {
  const searchParams = useSearchParams();
  const client_id = searchParams.get("client_id");
  const { data: job } = await fetchAdminJob(client_id, params.jobId);

  // Example usage
  const city = "Karachi";
  console.log();

  return (
    <div>
      <AdminJobViewById job={job} />
    </div>
  );
}

export default Page;
