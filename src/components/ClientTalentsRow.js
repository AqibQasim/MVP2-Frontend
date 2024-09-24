import { formatDate } from "@/utils/utility";
import Capsule from "./Capsule";
import CapsuleLink from "./CapsuleLink";
import EntityCard from "./EntityCard";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";
import { useParams } from "next/navigation";

function ClientTalentsRow({ talent }) {
  const { client_id } = talent;
  const { customer: candidate, job_postings: job } = talent;

  // const router = useRouter();
  // function handleRowClick() {
  //   router.push(`${talent.id}`);
  // }
  return (
    // <Table.Row onClick={handleRowClick}>
    <Table.Row>
      <EntityCard
        entity={{
          name: candidate?.name,
          profession: candidate?.position,
          image: "/avatars/avatar-1.png",
        }}
      />
      <div className="skills flex items-center justify-center gap-1.5 text-center">
        {job.skills.map((skill, i) => (
          <SkillIconWithBg key={i} icon={skill} />
        ))}
      </div>
      <div className="job-title text-center">{job.position}</div>
      <div className="experience text-center">{candidate.experience}</div>
      <Capsule>{candidate.commitment}</Capsule>
      <div className="date-hired text-nowrap text-center">
        {formatDate(new Date("2024-09-20"))}
      </div>
      {/* <CapsuleLink className="ml-auto" href={`${talent.id}`}> */}
      <CapsuleLink
        className="ml-auto"
        href={`/client/${client_id}/talents/${candidate.customer_id}`}
      >
        {" "}
        view talent{" "}
      </CapsuleLink>
    </Table.Row>
  );
}

export default ClientTalentsRow;
