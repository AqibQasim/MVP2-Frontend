"use client";
import { useEffect } from "react";
import AdminCandidateRow from "./AdminCandidateRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";
import AdminClientCandidatesRow from "./AdminClientCandidatesRow";

function AdminClientCandidatesTable({
  totalCandidates,
  candidates,
  setIsReportOverlayOpened,
  setSelectedCandidateId,
  isReportOverlayOpened,
}) {
  const path = window.location.href;

  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="These are all"
      heading="Candidates of Client"
      href={!path.includes("/admin/candidates")&&!path.includes(`/admin/clients/`) ? `/admin/candidates` : null}
      info={`Total Candidates: ${totalCandidates}`}
    >
      <Table columns="grid-cols-[1fr_9rem_1fr_8rem_10rem]">
        <Table.Header>
          <div className="info text-center">Candidate</div>
          <div className="skills text-center">Job Title</div>
          <div className="skills text-center">Skills</div>
          <div className="talent-status text-center">Talent Status</div>
          <div className="actions text-end">Actions</div>
        </Table.Header>
        {/* Make the body container scrollable */}
        <div className="h-full overflow-y-hidden">
          {" "}
          {/* Set the height as per your needs */}
          <Table.Body
            data={candidates}
            render={(candidate, i) => {
                console.log(candidate)
            //   const res =
            //     (candidate?.result?.softskillRating +
            //       candidate?.result?.technicalRating) /
            //     2;
              return (
                <AdminClientCandidatesRow
                  onClick={() => {
                    setSelectedCandidateId(
                      candidate?.customer_info?.customer_id,
                    );
                    setIsReportOverlayOpened(!isReportOverlayOpened);
                  }}
                  //score={res}
                  candidate={candidate?.customer_info}
                  jobName={candidate?.job?.position}
                  key={i}
                />
              );
            }}
          />
        </div>
      </Table>
    </DashboardSection>
  );
}

export default AdminClientCandidatesTable;
