import JobViewById from "@/components/JobViewById";
import { fetchClientJob } from "@/lib/data-service";

async function page({ params }) {
  const { data: job } = await fetchClientJob(params.clientId, params.jobId);

  return (
    <div>
      <JobViewById job={job} />
    </div>
  );
}

export default page;
