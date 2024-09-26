import JobViewById from "@/components/JobViewById";
import { fetchClientJob } from "@/lib/data-service";
import { cityTimezoneOffset } from "@/utils/cityTimezoneOffset";

async function Page({ params }) {
  const { data: job } = await fetchClientJob(params.clientId, params.jobId);

  // Example usage
  const city = "Karachi";
  console.log();

  return (
    <div>
      <JobViewById job={job} />
    </div>
  );
}

export default Page;
