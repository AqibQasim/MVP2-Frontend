"use client";
import AdminJobsRow from "./AdminJobsRow";
import CandidateJobsRow from "./CandidateJobsRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";
import { useCallback, useEffect, useState } from "react";

function AdminJobsList({ jobs, totalJobs, role }) {
  const path = window.location.href;
  const [jobStatus, setJobStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage] = useState(10);

  const handleJobStatusChange = (event) => {
    setJobStatus(event.target.value);
  };
  const filteredJobs = jobs
    .filter((job) => !jobStatus || job.job_status === jobStatus)
    .filter(
      (job) =>
        !searchTerm ||
        (typeof job?.position === "string" &&
          job?.position.toLowerCase().includes(searchTerm.toLowerCase())),
    );

  const onNext = useCallback(() => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, filteredJobs.length),
    );
  }, [filteredJobs.length, itemsPerPage]);

  const onPrev = useCallback(() => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  }, [itemsPerPage]);

  useEffect(() => {
    // Reset to first page whenever the filters/search change
    setStartIndex(0);
  }, [searchTerm, jobStatus]);

  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="This is the list of all"
      heading="Jobs"
      href={!path.includes("/admin/jobs")&& !path.includes(`/admin/clients/`) ? `/admin/jobs` : null}
      info={`Total Jobs: ${totalJobs || 0}`}
    >
      {role !== "dashboard" && (
        <div className="mb-4 flex justify-between">
          <div>
            <input
              type="text"
              placeholder="Search by Job title"
              className="mb-4 w-full cursor-pointer rounded border border-gray-300 p-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              id="options"
              value={jobStatus}
              onChange={handleJobStatusChange}
              className="rounded border border-gray-300 p-2"
            >
              <option value="">Select an job status</option>
              <option value="open">open</option>
              <option value="closed">Closed</option>
              <option value="interviewing">Interviewing</option>
              <option value="hired">Hired</option>
              <option value="trial">Trial</option>
            </select>
          </div>
        </div>
      )}

      <Table
        columns={
          jobs[0]?.client
            ? "grid-cols-[1fr_1.7fr_12.5rem_8rem_7rem_9.1rem]"
            : "grid-cols-[1fr_12.5rem_8rem_8rem_9.1rem]"
        }
      >
        <Table.Header>
          {jobs[0]?.client && <div className="name">Clients-Name</div>}
          <div className="name text-center">Job-Info</div>
          <div className="email text-center">Skills</div>
          <div className="experience text-center">Experience</div>
          <div className="commit text-center">Commit</div>
          <div className="status text-center">Status</div>
        </Table.Header>
        <Table.Body
          data={paginatedJobs}
          render={(job, i) => <AdminJobsRow job={job} key={i} />}
        />
        {role !== "dashboard" && (
         
         <Table.Footer
              data={filteredJobs}
              startIndex={startIndex + 1}
              endIndex={Math.min(startIndex + itemsPerPage, filteredJobs.length)}
              onNext={onNext}
              onPrevious={onPrev}
            />
        )}

      </Table>
    </DashboardSection>
  );
}

export default AdminJobsList;
