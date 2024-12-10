"use client";
import { useState, useCallback, useEffect } from "react";
import AdminCandidateRow from "./AdminCandidateRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";
import getCandidateStatus from "@/utils/getCandidateStatus";

function AdminCandidatesTable({ totalCandidates, candidates, role }) {
  const path = window.location.href;

  const [talentStatus, setTalentStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage] = useState(2);

  const handleTalentStatusChange = (event) => {
    setTalentStatus(event.target.value);
  };

  console.log("Candidates:", candidates);

  const filteredCandidates = candidates
    .filter(
      (candidate) =>
        !talentStatus ||
        getCandidateStatus(
          candidate?.customer?.talent_status,
          candidate?.customer?.status,
        ).toLowerCase() === talentStatus,
    )
    .filter(
      (candidate) =>
        !searchTerm ||
        (typeof candidate.customer?.name === "string" &&
          candidate.customer?.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())),
    );

  const onNext = useCallback(() => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, filteredCandidates.length),
    );
  }, [filteredCandidates.length, itemsPerPage]);

  const onPrev = useCallback(() => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  }, [itemsPerPage]);

  useEffect(() => {
    // Reset to first page whenever the filters/search change
    setStartIndex(0);
  }, [searchTerm, talentStatus]);

  const paginatedCandidates = filteredCandidates.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="These are all"
      heading="Candidates"
      href={!path.includes("/admin/candidates") ? `/admin/candidates` : null}
      info={`Total Candidates: ${totalCandidates}`}
    >
      {role !== "dashboard" && (
        <div className="mb-4 flex justify-between">
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
            <select
              id="options"
              value={talentStatus}
              onChange={handleTalentStatusChange}
              className="rounded border border-gray-300 p-2"
            >
              <option value="">Select an talent status</option>
              <option value="available">Avaliable</option>
              <option value="un-available">Un-Avaliable</option>
              <option value="interviewing">Interviewing</option>
              <option value="hired">Hired</option>
              <option value="trial">Trial</option>
            </select>
          </div>
        </div>
      )}

      <Table columns="grid-cols-[1fr_5.7rem_4rem_4rem_6.5rem_4.5rem_4.1rem_7.4rem]">
        <Table.Header>
          <div className="info text-start"> Candidate-Info</div>
          <div className="skills text-center">Skills</div>
          <div className="skills text-center">Hourly Rate</div>
          <div className="skills text-center">Referral Rate</div>
          <div className="experience text-center">Experience</div>
          <div className="job-type text-center">Job type</div>
          <div className="score text-center">Score</div>
          <div className="talent-status text-center">Talent Status</div>
        </Table.Header>
        {/* Make the body container scrollable */}
        <div className="min-h-fit overflow-x-hidden overflow-y-hidden">
          {" "}
          {/* Set the height as per your needs */}
          <Table.Body
            data={paginatedCandidates}
            render={(candidate, i) => {
              const res =
                (candidate?.result?.softskillRating +
                  candidate?.result?.technicalRating) /
                2;
              return (
                <AdminCandidateRow
                  score={res}
                  candidate={candidate?.customer}
                  key={i}
                />
              );
            }}
          />
        </div>
        {role !== "dashboard" && (
          <Table.Footer
            data={filteredCandidates}
            startIndex={startIndex + 1}
            endIndex={Math.min(
              startIndex + itemsPerPage,
              filteredCandidates.length,
            )}
            onNext={onNext}
            onPrevious={onPrev}
          />
        )}
      </Table>
    </DashboardSection>
  );
}

export default AdminCandidatesTable;
