"use client";

import React, { useState, useCallback, useEffect } from "react";
import DashboardSection from "./DashboardSection";
import Table from "./Table";
import AdminCandidateJobHistoryRow from "./AdminCandidateJobHistoryRow";

function AdminCandidateJobHistory({ job_history, total_job_history }) {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage] = useState(2);

  const paginatedjobs = job_history?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const onNext = useCallback(() => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, job_history?.length - itemsPerPage)
    );
  }, [job_history?.length, itemsPerPage]);

  const onPrev = useCallback(() => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  }, [itemsPerPage]);

  useEffect(() => {
    // Reset to first page whenever job history changes
    setStartIndex(0);
  }, [job_history?.length]);

  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="This is the list of all"
      heading="Job History"
      info={`Total Jobs: ${total_job_history || 0}`}
    >
      <Table
        columns="grid-cols-[1fr_1fr_1fr_1fr_7.1rem_8.1rem]"
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
          data={paginatedjobs}
          render={(job, i) => <AdminCandidateJobHistoryRow job={job} key={i} />}
        />
        <Table.Footer
          data={job_history}
          startIndex={startIndex + 1}
          endIndex={Math.min(startIndex + itemsPerPage, job_history?.length)}
          onNext={onNext}
          onPrevious={onPrev}
        />
      </Table>
    </DashboardSection>
  );
}

export default AdminCandidateJobHistory;
