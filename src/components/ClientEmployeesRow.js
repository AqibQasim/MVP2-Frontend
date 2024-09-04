import SvgIconEmployeeStatus from "@/svgs/SvgIconEmployeeStatus";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import Skill from "./Skill";
import Table from "./Table";

function ClientEmployeesRow({ employee }) {
  console.log(employee);
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
          <Skill key={i} skill={skill} />
        ))}
      </div>
      <div className="experience text-center">{employee.experience}</div>
      <Capsule
        className="mx-auto w-max !bg-primary-tint-100"
        icon={
          <IconWithBg
            icon={<SvgIconEmployeeStatus status={employee.status} />}
          />
        }
      >
        {" "}
        {employee.status}{" "}
      </Capsule>
    </Table.Row>
  );
}

export default ClientEmployeesRow;
