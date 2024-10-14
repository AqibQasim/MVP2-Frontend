"use client";
import AdminJobsRow from "./AdminJobsRow";
import CandidateJobsRow from "./CandidateJobsRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

function AdminJobsList({ jobs }) {
  console.log("jobs data", jobs);
  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="This is the list of all"
      heading="jobs"
    >
      <Table columns="grid-cols-[1fr_1.7fr_6rem_5rem_7.1rem_8.1rem]">
        <Table.Header>
          <div className="name">Info</div>
          <div className="email text-center">Skills</div>
          <div className="experience text-center">Experience</div>
          <div className="commit text-center">Commit</div>
          <div className="status text-center">Status</div>
          <div className="action text-center">Action</div>
        </Table.Header>
        <Table.Body
          data={jobs}
          render={(job, i) => <AdminJobsRow job={job} key={i} />}
        />
      </Table>
    </DashboardSection>
  );
}

export default AdminJobsList;
