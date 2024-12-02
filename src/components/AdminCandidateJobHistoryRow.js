import SvgIconJobStatus from "@/svgs/SvgIconJobStatus";
import SvgIconWork from "@/svgs/SvgIconWork";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import Skill from "./Skill";
import Table from "./Table";
import CapsuleLink from "./CapsuleLink";
import { useParams } from "next/navigation";

function AdminCandidateJobHistoryRow({ job }) {
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-CA"); // Formats to YYYY-MM-DD
  };
  //console.log("job ka data", job);

  return (
    <Table.Row>
      {job?.client && (
        <div className="w-max text-center">{job?.client?.name}</div>
      )}
      <EntityCard
        icon={<SvgIconWork className="relative -right-[1.3px]" />}
        entity={{
          name: job?.job_posting?.position,
          profession: job?.job_posting?.specialization,
        }}
      />

      <div className="experience text-center">
        {formatDate(job?.start_date)}
      </div>
      <div className="experience text-center">
        {job?.end_date === null
          ? "_"
          : formatDate(job?.end_date)}
      </div>
      <Capsule
        className="!mx-auto mr-auto w-max !bg-primary-tint-100"
        icon={
          <IconWithBg job={job?.job_posting?.job_status} className="pl-4" />
        }
      ></Capsule>

      <CapsuleLink
        className="ml-auto"
        href={`/admin/jobs/${job?.job_posting?.job_posting_id}?client_id=${job?.client?.client_id}`}
      >
        {" "}
        view details{" "}
      </CapsuleLink>
      {/* <Capsule
        className="mx-auto w-max !bg-primary-tint-100"
        icon={<IconWithBg icon={<SvgIconJobStatus status="hired" />} />}
      >
        view talent
      </Capsule> */}
    </Table.Row>
  );
}

export default AdminCandidateJobHistoryRow;
