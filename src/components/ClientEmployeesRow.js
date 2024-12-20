import { useParams, useRouter } from "next/navigation";
import Capsule from "./Capsule";
import CapsuleLink from "./CapsuleLink";
import EntityCard from "./EntityCard";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";

function ClientEmployeesRow({ hiredCandidate }) {
  const { customer_id, customer, job_postings } = hiredCandidate;
  const params = useParams();
  const clientId = params?.clientId;
  const router = useRouter();

  const handleRowClick = () => {
    router.push(
      `/client/${clientId}/talents/${customer_id}?job_posting_id=${job_postings.job_posting_id}`,
    );
  };
  return (
    <div className="cursor-pointer">
      <Table.Row onClick={handleRowClick}>
        <EntityCard
          entity={{
            image: "/avatars/avatar-2.png",
            name: customer?.name,
            profession: customer?.profession,
          }}
        />
        <div className="skills flex items-center justify-center gap-1.5 text-center">
          {job_postings?.skills.length > 1 ? (
            <div className="flex">
              <SkillIconWithBg
                icon={job_postings?.skills[0]}
                skill={job_postings?.skills[0]}
              />
              <div className="mt-2">+ {job_postings?.skills.length - 1}</div>
            </div>
          ) : (
            <SkillIconWithBg
              icon={job_postings?.skills[0]}
              skill={job_postings?.skills[0]}
            />
          )}
        </div>
        <div className="experience text-center">{customer?.experience}</div>
        <div className="commit text-center"> {customer?.commitment} </div>
        <Capsule
          className="status mx-auto w-max"
          status={customer?.talent_status}
        >
          {customer.talent_status}
        </Capsule>
      </Table.Row>
    </div>
  );
}

export default ClientEmployeesRow;
