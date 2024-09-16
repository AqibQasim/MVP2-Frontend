
import { useCallback, useEffect, useState } from "react";
import SvgIconJobStatus from "@/svgs/SvgIconJobStatus";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";
import SvgIconRequestInterview from "@/svgs/SvgIconRequestInterview";
import Modal from "./AdminJobsFormModal"; // Import your Modal component
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { fetchClientJobs, getClients, getJobs } from "@/lib/data-service";

function AdminCandidateRecommendedRow({ recommended }) {
  const [showForm, setShowForm] = useState(false);
  const [hourlyRate, setHourlyRate] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [clients, setClients] = useState(null);
  const [searchClient, setSearchClient] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [searchJob, setSearchJob] = useState("");
  const [jobs, setFetchedJobs] = useState(null);
  const [selectedJob, setSelectedJob] = useState("");

  // const onSearch=useCallback((e)=>{
  //   e.preventDefault();

  // },[searchClient])

  const filteredClients = clients?.filter((client) =>
    client.name.toLowerCase().includes(searchClient.toLowerCase()),
  );

  const filteredJobs = jobs?.filter((job) =>
    job.position.toLowerCase().includes(searchJob.toLowerCase()),
  );

  const fetchClients = useCallback(async () => {
    const f = await getClients();
    if (f.status === 200) {
      setClients(f.data);
    }
  }, []);

  const fetchJobs = useCallback(async () => {

    if(selectedClientId){
    const f = await fetchClientJobs(selectedClientId);
    if (f.status === 200) {
      setFetchedJobs(f.data.result);
    }
  }
  }, [selectedClientId]);

  useEffect(() => {
    fetchClients();
  }, [showForm]);

  useEffect(()=>{
    fetchJobs();
    
  },[searchJob])

  // Static list of clients
  // const clients = [
  //   { id: 1, name: "Client A" }
  // ];

  // Function to handle form submission
  const handleReferCandidate = async (e) => {
    e.preventDefault();
    console.log("Hourly Rate:", hourlyRate);
    console.log("Assigned to Client:", selectedClient);

    // Reset form and close modal
    setHourlyRate("");
    setSelectedClient("");
    setShowForm(false);

    const payload = {
      endpoint: "assigned-customer",
      method: "POST",
      body: {
        customer_id,
        //job_posting_id:
      },
    };

    const response = await mvp2ApiHelper(payload);
  };

  return (
    <>
      <Table.Row>
        <EntityCard
          entity={{
            name: recommended?.name,
            profession: recommended?.position,
            image: "/avatars/avatar-1.png",
          }}
        />
        <div className="skills flex items-center justify-center gap-1.5 text-center">
          {recommended?.skills?.length > 0 ? (
            recommended.skills.map((skill, i) => (
              <SkillIconWithBg key={i} icon={skill} />
            ))
          ) : (
            <span>No skills available</span>
          )}
        </div>

        <div className="experience text-center">
          {recommended?.experience || "No experience"}
        </div>
        <Capsule>{recommended?.job_type || "No job type"}</Capsule>

        {/* Button to open form */}
        <button onClick={() => setShowForm(true)}>
          <Capsule
            className="ml-auto !bg-primary-tint-100"
            icon={<IconWithBg icon={<SvgIconRequestInterview />} />}
          >
            Refer to Client
          </Capsule>
        </button>
      </Table.Row>

      {/* Modal for the referral form */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <h3 className="mb-4 text-xl font-semibold">
          Refer {recommended?.role} to Client
        </h3>
        <form onSubmit={handleReferCandidate}>
          <label className="block">Hourly Rate</label>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            required
            className="mt-2 block w-full border px-2 py-1"
          />

          <label className="mt-4 block">Assign to Client</label>
          <input
            type="text"
            value={selectedClient || searchClient}
            onChange={(e) => setSearchClient(e.target.value)}
            placeholder="Search client by name"
            className="mb-2 block w-full border px-2 py-1"
          />

          {/* <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            required
            className="mt-2 block w-full border px-2 py-1"
          > */}
          {/* <option value="">Select a client</option> */}
          {searchClient &&
            filteredClients?.map((client) => (
              <option
                onClick={() => {
                  setSearchClient("");
                  setSelectedClient(client.name);
                  setSelectedClientId(client.client_id);
                }}
                key={client.client_id}
                value={client.client_id}
              >
                {client.name}
              </option>
            ))}

          <label className="mt-4 block">Select Job</label>
          <input
            type="text"
            value={selectedJob || searchJob}
            onChange={(e) => setSearchJob(e.target.value)}
            placeholder="Search Job"
            className="mb-2 block w-full border px-2 py-1"
          />

          {searchJob &&
            filteredJobs?.map((job) => (
              <option
                onClick={() => {
                  setSearchJob("");
                  setSelectedJob(job.position);
                  setSelectedClientId(job.job_posting_id);
                }}
                key={job.job_posting_id}
                value={job.job_posting_id}
              >
                {job.position}
              </option>
            ))}
          {/* </select> */}

          <div className="mt-4">
            <button
              type="submit"
              className="mr-2 bg-blue-500 px-4 py-2 text-white"
            >
              Confirm Referral
            </button>
            <button
              type="submit"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AdminCandidateRecommendedRow;
