"use client";
import AdminCandidateRecommendedRow from "./AdminCandidateRecommendedRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

function AdminCandidatesTable({ candidates }) {
  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="These are all"
      heading="Candidates"
    >
      <Table columns="grid-cols-[1fr_0.7fr_1fr_1fr_1fr]">
        <Table.Header>
          <div className="info">Info</div>
          <div className="skills text-center">Skills</div>
          <div className="experience text-center">Experience</div>
          <div className="job-type text-center">Job type</div>
          <div className="actions text-right">Actions</div>
        </Table.Header>
        <Table.Body
          data={candidates}
          render={(recommended, i) => (
            <AdminCandidateRecommendedRow recommended={recommended} key={i} />
          )}
        />
      </Table>
    </DashboardSection>
  );
}

export default AdminCandidatesTable;
