"use client";
import AdminJobsRow from "./AdminJobsRow";
import CandidateJobsRow from "./CandidateJobsRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

function AdminJobsList({ jobs, totalJobs }) {
  const path = window.location.href;
  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="This is the list of all"
      heading="jobs"
      href={!path.includes("/admin/jobs") ? `/admin/jobs` : null}
      info={`Total Jobs: ${totalJobs || 0}`}
    >
      <Table
        columns={
          jobs[0].client
            ? "grid-cols-[1fr_1.7fr_6.5rem_6rem_5rem_7.1rem_8.1rem]"
            : "grid-cols-[1fr_6.5rem_6rem_5rem_7.1rem_8.1rem]"
        }
      >
        <Table.Header>
          {jobs[0].client && <div className="name">Clients</div>}
          <div className="name text-center">Info</div>
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
