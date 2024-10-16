"use client";
import AdminCandidateRow from "./AdminCandidateRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

function AdminCandidatesTable({ candidates, setIsReportOverlayOpened, setSelectedCandidateId, isReportOverlayOpened }) {
  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="These are all"
      heading="Candidates"
    >
      <Table columns="grid-cols-[1.7fr_1.7fr_10rem_8rem_8.1rem_9.8rem]">
        <Table.Header>
          <div className="info">Info</div>
          <div className="skills text-center">Skills</div>
          <div className="skills text-center">Hourly Rate</div>
          <div className="experience text-center">Experience</div>
          <div className="job-type text-center">Job type</div>
          <div className= 'text-center' >Score</div>
          <div className= 'text-center' >Talent Status</div>
          <div className="actions text-center">Actions</div>
        </Table.Header>
        <Table.Body
          data={candidates?.data}
          render={(candidate, i) => {
            const res =
              (candidate?.result?.softskillRating +
                candidate?.result?.technicalRating) /
              2;
            return (
              <AdminCandidateRow
              onClick={()=>{
                setSelectedCandidateId(candidate?.customer_id);
                setIsReportOverlayOpened(!isReportOverlayOpened)
              }}
                score={res}
                candidate={candidate?.customer}
                key={i}
              />
            );
          }}
        />
      </Table>
    </DashboardSection>
  );
}

export default AdminCandidatesTable;



