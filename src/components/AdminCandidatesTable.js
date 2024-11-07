"use client";
import { useEffect, useState } from "react";
import AdminCandidateRow from "./AdminCandidateRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";

function AdminCandidatesTable({
  totalCandidates,
  candidates,
  setIsReportOverlayOpened,
  setSelectedCandidateId,
  isReportOverlayOpened,
}) {
  const path = window.location.href;

  const [talentStatus, setTalentStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleTalentStatusChange = (event) => {
    setTalentStatus(event.target.value);
  };

  console.log("Candidates:", candidates);

 
    

     const filteredCandidates = candidates
     .filter(candidate =>
       !talentStatus || candidate.customer?.talent_status === talentStatus
     )
     .filter(candidate =>
       !searchTerm || (typeof candidate.customer?.name === 'string' && candidate.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()))
     );
   
  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="These are all"
      heading="Candidates"
      href={!path.includes("/admin/candidates") ? `/admin/candidates` : null}
      info={`Total Candidates: ${totalCandidates}`}
    >
      <div className="mb-4 flex justify-between ">

      <div>
        <input
        type="text"
        placeholder="Search by name"
        className="mb-4 w-full cursor-pointer rounded border border-gray-300 p-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
        </div>

        <div>
          
        <label htmlFor="options" className="mr-2 mt-2">
          Choose an option:
        </label>
        <select
          id="options"
          value={talentStatus}
          onChange={handleTalentStatusChange}
          className="rounded border border-gray-300 p-2"
        >
          <option value="">Select an talent status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="interviewing">Interviewing</option>
          <option value="hired">Hired</option>
        </select>
        </div>
      


      </div>

      <Table columns="grid-cols-[7rem_5.7rem_4rem_6rem_4.5rem_4.1rem_7.4rem_7.8rem]">
        <Table.Header>
          <div className="info text-center">Info</div>
          <div className="skills text-center">Skills</div>
          <div className="skills text-center">Hourly Rate</div>
          <div className="experience text-center">Experience</div>
          <div className="job-type text-center">Job type</div>
          <div className="score text-center">Score</div>
          <div className="talent-status text-center">Talent Status</div>
          <div className="actions text-center">Actions</div>
        </Table.Header>
        {/* Make the body container scrollable */}
        <div className="h-full overflow-y-hidden">
          {" "}
          {/* Set the height as per your needs */}
          <Table.Body
            data={filteredCandidates }
            render={(candidate, i) => {
              const res =
                (candidate?.result?.softskillRating +
                  candidate?.result?.technicalRating) /
                2;
              return (
                <AdminCandidateRow
                  onClick={() => {
                    setSelectedCandidateId(candidate?.customer_id);
                    setIsReportOverlayOpened(!isReportOverlayOpened);
                  }}
                  score={res}
                  candidate={candidate?.customer}
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

export default AdminCandidatesTable;
