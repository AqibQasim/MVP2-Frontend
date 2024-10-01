import { useParams } from "next/navigation";
import Capsule from "./Capsule";
import CapsuleLink from "./CapsuleLink";
import EntityCard from "./EntityCard";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";

function ClientEmployeesRow({ hiredCandidate }) {
  const { customer_id, customer, job_postings } = hiredCandidate;
  const params = useParams();
  const clientId = params?.clientId;
  return (
    <Table.Row>
      <EntityCard
        entity={{
          image: "/avatars/avatar-1.png",
          name: customer?.name,
          profession: customer?.profession,
        }}
      />
      <div className="skills flex items-center justify-center gap-1.5 text-center">
        {job_postings?.skills.map((skill, i) => (
          <SkillIconWithBg key={i} icon={skill} />
        ))}
      </div>
      <div className="experience text-center">{customer?.experience}</div>
      <div className="commit text-center"> {customer?.commitment} </div>
      <Capsule className="status mx-auto w-max" status={customer?.status}>
        {customer?.status || "[status]"}
      </Capsule>
      <CapsuleLink
        className="action ml-auto"
        href={`/client/${clientId}/talents/${customer_id}?job_posting_id=${job_postings.job_posting_id}`}
      >
        {" "}
        view details{" "}
      </CapsuleLink>
    </Table.Row>
  );
}

export default ClientEmployeesRow;
