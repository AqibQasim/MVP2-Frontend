"use client";

import AdminJobViewById from "@/components/AdminJobViewById";
import Modal from "@/components/AdminJobsFormModal";
import { referCandidateToClientAction } from "@/lib/actions";
import { fetchAdminJob, fetchRecommendedCandidates } from "@/lib/data-service";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

function Page({ params }) {
  const searchParams = useSearchParams();
  const client_id = searchParams.get("client_id");

  const [job, setJob] = useState(null);
  const [isCandidateShow, setIsCandidateShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [candidates, setCandidates] = useState(null);
  const [searchCandidate, setSearchCandidate] = useState(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [candidateHourlyRate, setCandidateHourlyRate] = useState(null);
  const [error, setError] = useState(null);
  const [hourlyRate, setHourlyRate] = useState("");

  useEffect(() => {
    // Fetch the job data
    const fetchJob = async () => {
      try {
        const { data } = await fetchAdminJob(client_id, params.jobId);
        setJob(data);
      } catch (err) {
        setError(err.message || "Failed to fetch job data");
      }
    };

    fetchJob();
  }, [client_id, params.jobId]);

  useEffect(() => {
    // Fetch recommended candidates
    const getRecommendedCandidates = async () => {
      try {
        const { data } = await fetchRecommendedCandidates();
        console.log(data?.data);
        setCandidates(data?.data);
      } catch (err) {
        setError(err.message || "Failed to fetch candidates");
      }
    };

    getRecommendedCandidates();
  }, []);

  const filteredCandidates = candidates?.filter(
    (candidate) =>
      candidate?.customer?.name
        ?.toLowerCase()
        .includes(searchCandidate?.toLowerCase()) &&
      candidate?.customer?.talent_status === "open",
  );

  const handleAssignJob = async (e) => {
    e.preventDefault();

    const referClientBody = {
      client_id: client_id,
      customer_id: selectedCandidateId,
      job_posting_id: job?.job_posting_id,
      hourly_rate: hourlyRate,
      candidate_hourly_rate: candidateHourlyRate,
    };

    console.log(referClientBody);

    const { error, message } =
      await referCandidateToClientAction(referClientBody);
    if (error) {
      console.log({ Error: error });
      return setError(error);
    } else {
      setShowForm(false);
    }
    if (message) {
      console.log("Refer Message: ", message);
      return setShowForm(false);
    }
  };

  return (
    <>
      {job ? (
        <AdminJobViewById setShowForm={setShowForm} job={job} />
      ) : (
        <p>Loading job details...</p>
      )}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <h3 className="mb-4 text-xl font-semibold">
          Assign {job?.position} to Candidate
        </h3>
        <form onSubmit={handleAssignJob}>
          <label className="mt-4 flex">
            Candidate Name <div className="text-red-600">*</div>
          </label>
          <input
            type="text"
            value={searchCandidate}
            onChange={(e) => {
              setIsCandidateShow(true);
              setSearchCandidate(e.target.value);
            }}
            required
            placeholder="Search Name"
            className="mb-2 block w-full border px-2 py-1"
          />

          {isCandidateShow &&
            filteredCandidates?.map((candidate) => (
              <div
                onClick={() => {
                  setIsCandidateShow(false);
                  setSearchCandidate(candidate?.customer?.name);
                  setSelectedCandidateId(candidate?.customer_id);
                  setCandidateHourlyRate(candidate?.customer?.hourly_rate);
                }}
                key={candidate?.customer_id}
                className="cursor-pointer"
              >
                {candidate?.customer?.name}
              </div>
            ))}
          {candidateHourlyRate && (
            <>
              <label className="flex">
                Candidate&apos;s Hourly Rate{" "}
                <div className="text-red-600">*</div>
              </label>
              <div>{candidateHourlyRate}</div>
            </>
          )}

          <label className="flex">
            Your Proposed Hourly Rate <div className="text-red-600">*</div>
          </label>
          <input
            type="text"
            // name="hourlyRate"
            // id="hourlyRate"
            required
            onChange={(e) => setHourlyRate(e.target.value)}
            className="mt-2 block w-full border px-2 py-1"
          />

          {error && <div className="error text-red-500">{error}</div>}

          <div className="mt-4">
            <button
              type="submit"
              className="mr-2 bg-blue-500 px-4 py-2 text-white"
            >
              Confirm Referral
            </button>
            <button
              type="button"
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

export default Page;
