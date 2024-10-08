"use client";
import React from 'react'
import DashboardSection from './DashboardSection'
import Table from './Table'
import AdminCandidateRow from './AdminCandidateRow'
import AdminCandidatesClientsHiringRow from './AdminCandidatesClientsHiringRow';

function AdminCandidatesClientsHiringTable({candidateJobStatus}) {
  return (
    <DashboardSection
      className="!min-h-full"
      paragraph="These are all"
      heading="Hirings of Candidates with Clients"
    >
      <Table columns="grid-cols-[1fr_0.7fr_1fr_1fr_1fr]">
        <Table.Header>
          <div className="info">Candidate Name</div>
          <div className="skills">Client Name</div>
          <div className="">Job</div>  
          <div className="experience">Job Status</div>  
          <div className="job-type">Days Passed</div>
          <div className="actions">Actions</div>
        </Table.Header>
        <Table.Body
          data={candidateJobStatus?.data}
          render={(job, i) => (
            <AdminCandidatesClientsHiringRow daysPassed={job?.days_passed} candidate={job?.customer_info} client={job?.client} job={job?.job} key={i} />
          )}
        />
      </Table>
    </DashboardSection>
  )
}

export default AdminCandidatesClientsHiringTable