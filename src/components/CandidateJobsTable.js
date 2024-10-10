"use client";
import { useEffect, useState } from "react";
import CandidateJobsRow from "./CandidateJobsRow";
import DashboardSection from "./DashboardSection";
import Table from "./Table";
import { useParams } from "next/navigation";

function CandidateJobsTable() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const cid = params.candidateId;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/get-job-candidates?job_status=hired-and-trial&candidate_id=${cid}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data)
        setJobs(data?.data); // assuming the data is in the 'data' field
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div>Loading...</div>; // You can customize your loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Handle errors here
  }

  return (
    <DashboardSection
      className="!min-h-full overflow-auto"
      paragraph="These are all"
      heading="Your jobs"
    >
      <Table columns="grid-cols-[1fr_1.7fr_6rem_5rem_7.1rem_8.1rem]  "     >
        <Table.Header>
          <div className="name">Info</div>
          <div className="email text-center">Skills</div>
          <div className="experience text-center">Experience</div>
          <div className="commit text-center">Commit</div>
          <div className="status text-center">Status</div>
          <div className="action text-center">Action</div>
        </Table.Header>
        {jobs && jobs.length > 0 ? (
        <Table.Body
          data={jobs}
          render={(job, i) => <CandidateJobsRow job={job} key={i}    />}
        />
        ) : (
         <div >
          <p>No data to show at the moment</p>
         </div>
        )}
      </Table>
    </DashboardSection>
  );
}

export default CandidateJobsTable;
