import { useParams } from "next/navigation";
import Capsule from "./Capsule";
import CapsuleLink from "./CapsuleLink";
import EntityCard from "./EntityCard";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";

function ClientEmployeesRow({ employee }) {
  const params = useParams();
  const clientId = params?.clientId;
  return (
    <Table.Row>
      <EntityCard
        entity={{
          image: "/avatars/avatar-1.png",
          name: employee?.name,
          profession: employee?.profession,
        }}
      />
      <div className="skills flex items-center justify-center gap-1.5 text-center">
        {employee.skills.map((skill, i) => (
          <SkillIconWithBg key={i} icon={skill} />
        ))}
      </div>
      <div className="experience text-center">{employee?.experience}</div>
      <div className="commit text-center"> {employee.commitment} </div>
      <Capsule className="status mx-auto w-max" status={employee.status}>
        {employee.status}
      </Capsule>
      <CapsuleLink
        className="action ml-auto"
        href={`/client/${clientId}/jobs/${employee.id}`}
      >
        {" "}
        view details{" "}
      </CapsuleLink>
    </Table.Row>
  );
}

export default ClientEmployeesRow;
