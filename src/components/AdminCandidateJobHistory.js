import React from "react";
import DashboardSection from "./DashboardSection";
import Table from "./Table";
import AdminCandidateJobHistoryRow from "./AdminCandidateJobHistoryRow";

function AdminCandidateJobHistory({ job_history, total_job_history }) {
  const router = useRouter(); 
  const path = window.location.href;

  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="This is the list of all"
      heading="Job History"
      href={!path.includes("/admin/jobs") ? `/admin/jobs` : null}
      info={`Total Jobs: ${total_job_history || 0}`}
    >
      <Table
        columns={
          "grid-cols-[1fr_1fr_1fr_1fr_7.1rem_8.1rem]"

          //: "grid-cols-[1fr_6.5rem_6rem_5rem_7.1rem_8.1rem]"
        }
      >
        <Table.Header>
          <div className="name">Clients</div>
          <div className="email text-center">Job Title</div>
          <div className="experience text-center">Start_Tenure</div>
          <div className="experience text-center">End_Tenure</div>
          <div className="status text-center">Job Status</div>
          <div className="action text-center">Action</div>
        </Table.Header>
        <Table.Body
          data={job_history}
          render={(job, i) => <AdminCandidateJobHistoryRow job={job} key={i} />}
        />
      </Table>
    </DashboardSection>
  );
}

export default AdminCandidateJobHistory;
