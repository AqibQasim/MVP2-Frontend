import { referCandidateToClientAction } from "@/lib/actions";
import { fetchClientJobs, getClients } from "@/lib/data-service";
import SvgIconRequestInterview from "@/svgs/SvgIconRequestInterview";
import { useCallback, useEffect, useState } from "react";
import Modal from "./AdminJobsFormModal";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";

function AdminCandidateRow({ candidate, score }) {
  const [showForm, setShowForm] = useState(false);
  const [hourlyRate, setHourlyRate] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [clients, setClients] = useState(null);
  const [searchClient, setSearchClient] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [searchJob, setSearchJob] = useState("");
  const [jobs, setFetchedJobs] = useState(null);
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [error, setError] = useState(null);
  const [isClientsShow, setIsClientShow] = useState(false);
  const [isJobsShow, setIsJobsShow] = useState(false);

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
    if (selectedClientId) {
      const f = await fetchClientJobs(selectedClientId);
      if (f.status === 200) {
        setFetchedJobs(f.data.result);
      }
    }
  }, [selectedClientId]);

  useEffect(() => {
    fetchClients();
  }, [showForm]);

  useEffect(() => {
    fetchJobs();
  }, [searchJob]);

  const handleReferCandidate = async (formData) => {
    // e.preventDefault();

    const referClientBody = {
      client_id: selectedClientId,
      customer_id: candidate.customer_id,
      job_posting_id: selectedJobId,
      hourly_rate: hourlyRate,
    };

    const { error, message } =
      await referCandidateToClientAction(referClientBody);
    if (error) {
      console.log({ Error: error });
      return setError(error);
    }
    if (message) {
      console.log("Refer Message: ", message);
      return setShowForm(false);
    }
  };

  return (
    <>
      <Table.Row>
        <EntityCard
          entity={{
            name: candidate?.name,
            profession: candidate?.specialization,
            image: "/avatars/avatar-1.png",
          }}
        />
        <div className="skills flex items-center justify-center gap-1.5 text-center">
          {candidate?.expertise?.length > 0 ? (
            candidate.expertise.map((skill, i) => (
              <SkillIconWithBg key={i} icon={skill} skill={skill}/>
            ))
          ) : (
            <span>No skills available</span>
          )}
        </div>

        <div className="experience text-center">
          {candidate?.experience || "No experience"}
        </div>
        <Capsule>{candidate?.commitment || "No job type"}</Capsule>

        <div className="experience text-center">
          {score}/10
        </div>

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
          Refer {candidate?.role} to Client
        </h3>
        <form action={handleReferCandidate}>
          <label className="block">Hourly Rate</label>
          <input
            type="number"
            name="hourlyRate"
            id="hourlyRate"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            required
            className="mt-2 block w-full border px-2 py-1"
          />

          <label className="mt-4 block">Assign to Client</label>
          <input
            type="text"
            value={searchClient}
            onChange={(e) => {
              setIsClientShow(true);
              setSearchClient(e.target.value);
            }}
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
          {isClientsShow &&
            filteredClients?.map((client) => (
              <option
                onClick={() => {
                  setIsClientShow(false);
                  setSearchClient(client.name);
                  setSelectedClient(client.name);
                  setSelectedClientId(client.client_id);
                }}
                key={client.client_id}
                value={client.client_id}
                className="cursor-pointer"
              >
                {client.name}
              </option>
            ))}

          <label className="mt-4 block">Select Job</label>
          <input
            type="text"
            value={searchJob}
            onChange={(e) => {
              setIsJobsShow(true);
              setSearchJob(e.target.value);
            }}
            placeholder="Search Job"
            className="mb-2 block w-full border px-2 py-1"
          />

          {isJobsShow &&
            filteredJobs?.map((job) => (
              <option
                onClick={() => {
                  setIsJobsShow(false);
                  setSearchJob(job.position);
                  setSelectedJob(job.position);
                  setSelectedJobId(job.job_posting_id);
                }}
                key={job.job_posting_id}
                value={job.job_posting_id}
                 className="cursor-pointer"
              >
                {job.position}
              </option>
            ))}
          {/* </select> */}
          {/* Error Temp */}
          {error ? <div className="error text-red-500"> {error} </div> : null}

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

export default AdminCandidateRow;
