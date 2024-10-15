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
      <Table columns="grid-cols-[1fr_1fr_7.5rem_6rem_7rem_10.5rem]  ">
        <Table.Header>
          <div className="info ">Candidate Name</div>
          <div className="skills">Client Name</div>
          <div className="text-center">Job</div>  
          <div className="experience text-center">Job Status</div>  
          <div className="job-type text-center ">Days Passed</div>
          <div className="actions text-center">Actions</div>
        </Table.Header>
        <Table.Body
        error={candidateJobStatus?.length===0&&'No candidates hired yet'}
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