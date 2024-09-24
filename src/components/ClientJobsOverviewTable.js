"use client";
import ClientJobsRow from "./ClientJobsOverviewRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

function ClientJobsOverviewTable({ jobs }) {
  return (
    <DashboardSection paragraph="These are all" heading="Your job">
      <Table columns="grid-cols-[1fr_1fr_0.7fr_0.7fr_0.7fr_0.7fr]">
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
          render={(job, i) => <ClientJobsRow job={job} key={i} />}
        />
      </Table>
    </DashboardSection>
  );
}

export default ClientJobsOverviewTable;
