"use client"

import React from "react";
import DashboardSection from "./DashboardSection";
import Table from "./Table";
import AdminCandidateJobHistoryRow from "./AdminCandidateJobHistoryRow";
import { useRouter } from "next/navigation";
import { useState,useCallback, useEffect } from "react";


function AdminCandidateJobHistory({ job_history, total_job_history }) {
  const path = window.location.href;
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage] = useState(2);

  const onNext = useCallback(() => {
    setStartIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, total_job_history));
  }, [ total_job_history, itemsPerPage]);

  const onPrev = useCallback(() => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  }, [itemsPerPage]);

  useEffect(() => {
    // Reset to first page whenever the filters/search change
    setStartIndex(0);
  }, [job_history]);


  const paginatedjobs = job_history.slice(startIndex, startIndex + itemsPerPage);

  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="This is the list of all"
      heading="Job History"
      // href={!path.includes("/admin/jobs") ? `/admin/jobs` : null}
      info={`Total Jobs: ${total_job_history || 0}`}
    >
      <Table
        columns={
          "grid-cols-[1fr_1fr_1fr_1fr_7.1rem_8.1rem]"

          //: "grid-cols-[1fr_6.5rem_6rem_5rem_7.1rem_8.1rem]"
        }
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
              data={paginatedjobs}
              startIndex={startIndex + 1}
              endIndex={Math.min(startIndex + itemsPerPage, paginatedjobs.length)}
              onNext={onNext}
              onPrevious={onPrev}
            />

      </Table>
    </DashboardSection>
  );
}

export default AdminCandidateJobHistory;
