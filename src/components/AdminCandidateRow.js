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
import getCandidateStatus from "@/utils/getCandidateStatus";
import { useRouter } from "next/navigation";
import ButtonCapsule from "./ButtonCapsule";

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

  const router = useRouter();

  // const filteredClients = clients?.filter((client) =>
  //   client.name.toLowerCase().includes(searchClient.toLowerCase()),
  // );

  // const filteredJobs = jobs?.filter((job) =>
  //   job.position.toLowerCase().includes(searchJob.toLowerCase()),
  // );

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
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [searchJob]);

  // const handleReferCandidate = async (formData) => {
  //   // e.preventDefault();

  //   const referClientBody = {
  //     client_id: selectedClientId,
  //     customer_id: candidate.customer_id,
  //     job_posting_id: selectedJobId,
  //     hourly_rate: hourlyRate,
  //   };

  //   console.log(referClientBody);

  //   const { error, message } =
  //     await referCandidateToClientAction(referClientBody);
  //   if (error) {
  //     console.log({ Error: error });
  //     return setError(error);
  //   } else {
  //     setShowForm(false);
  //   }
  //   // if (message) {
  //   //   console.log("Refer Message: ", message);
  //   //   return setShowForm(false);
  //   // }
  // };

  return (
    <>
      <div className="cursor-pointer">
        <Table.Row
          className="cursor-pointer"
          onClick={() =>
            router.push(`/admin/candidates/${candidate?.customer_id}`)
          }
        >
          <div className="cursor-pointer text-start">
            <EntityCard
              entity={{
                name: candidate?.name,
                profession: candidate?.specialization,
                image: "/avatars/avatar-2.png",
              }}
            />
          </div>

          <div className="skills flex flex-col items-center justify-center gap-1 text-center">
            {candidate?.expertise?.length > 1 ? (
              <div className="flex">
                <SkillIconWithBg
                  icon={candidate.expertise[0].skill}
                  skill={candidate.expertise[0].skill}
                />
                <div className="mt-2 text-sm text-gray-500">
                  +{candidate.expertise.length - 1}
                </div>
              </div>
            ) : (
              <span>
                {" "}
                <SkillIconWithBg
                  icon={candidate.expertise[0].skill}
                  skill={candidate.expertise[0].skill}
                />
              </span>
            )}
          </div>

          <div className="experience flex justify-center text-center">
            {candidate?.hourly_rate || 0}$
          </div>
          <div className="experience flex justify-center text-center">
            {candidate?.admin_hourly_rate || 0}$
          </div>

          <div className="experience text-center">
            {candidate?.experience || "No experience"}
          </div>
          <Capsule>{candidate?.commitment || "No job type"}</Capsule>

          <div className="experience text-center">{score}/10</div>

          <Capsule
            className="status mx-auto w-max"
            status={getCandidateStatus(
              candidate?.talent_status,
              candidate?.status,
            )}
          >
            {getCandidateStatus(candidate?.talent_status, candidate?.status)}
            {/* {candidate?.talent_status === "open" && candidate?.status==="active"  ? "Avaliable"            
            :  candidate?.talent_status?.toLowerCase() === "open" && candidate?.status==="in-active" ? "Un-Avaliable"
            :   candidate?.talent_status } */}
          </Capsule>
          <ButtonCapsule onPress={async () => {
            await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/profile/${candidate?.customer_id}`);
          }}>Copy</ButtonCapsule>

          {/* Button to open form */}
          {/* <button onClick={() => {
          if (candidate?.talent_status === "open") {
            setShowForm(true)
          }
        }}>
          <Capsule
            className="ml-auto !bg-primary-tint-100"
            icon={<IconWithBg icon={<SvgIconRequestInterview />} />}
          >
            <div className={(candidate?.talent_status !== "open") ? `text-[grey] cursor-not-allowed` : null}>Refer to Client</div>
          </Capsule>
        </button> */}
        </Table.Row>
      </div>

      {/* <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
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
          /> */}

      {/* <label className="mt-4 block">Assign to Client</label>
          <input
            type="text"
            value={searchClient}
            onChange={(e) => {
              setIsClientShow(true);
              setSearchClient(e.target.value);
            }}
            placeholder="Search client by name"
            className="mb-2 block w-full border px-2 py-1"
          /> */}

      {/* <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            required
            className="mt-2 block w-full border px-2 py-1"
          > */}
      {/* <option value="">Select a client</option> */}
      {/* {isClientsShow &&
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
            ))} */}
      {/* </select> */}
      {/* Error Temp */}
      {/* {error ? <div className="error text-red-500"> {error?.message} </div> : null}

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
      </Modal> */}
    </>
  );
}

export default AdminCandidateRow;
