"use client";
import React from 'react'
import DashboardSection from './DashboardSection'
import Table from './Table'
import AdminCandidateRow from './AdminCandidateRow'

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
          <div className="skills text-center">Client Name</div>
          <div className="experience text-center">Job Status</div>  
          <div className="job-type text-center">Days Passed</div>
          <div className="actions text-right">Actions</div>
        </Table.Header>
        <Table.Body
          data={candidateJobStatus?.data}
          render={(job, i) => (
            <AdminCandidateRow candidate={job?.customer_info} client={job?.client} job={job?.job} key={i} />
          )}
        />
      </Table>
    </DashboardSection>
  )
}

export default AdminCandidatesClientsHiringTable