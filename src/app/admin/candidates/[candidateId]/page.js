"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
//import ButtonBack from "./ButtonBack";
import Capsule from "@/components/Capsule";
import ClientPaymentHistoryTable from "@/components/ClientPaymentHistoryTable";
import DetailTag from "@/components/DetailTag";
import EntityCard from "@/components/EntityCard";
import Heading from "@/components/Heading";
import Hr from "@/components/Hr";
import IconWithBg from "@/components/IconWithBg";
//import TalentDescription from "./TalentDescription";
import EmailSvg from "../../../../../public/icons/email.svg";
import phone from "../../../../../public/icons/call.png";
import { cityTimezoneOffset } from "@/utils/cityTimezoneOffset";
import { formatDate } from "@/utils/utility";
import ButtonCapsuleWhite from "@/components/ButtonCapsuleWhite";
import Image from "next/image";
import Skill from "@/components/Skill";
import Modal from "@/components/AdminJobsFormModal";
import { referCandidateToClientAction } from "@/lib/actions";
import { fetchClientJobs, getClients } from "@/lib/data-service";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import AdminCandidateJobHistory from "@/components/AdminCandidateJobHistory";
import getCandidateStatus from "@/utils/getCandidateStatus";
import ButtonCapsule from "@/components/ButtonCapsule";
import ErrorPopup from "@/components/ErrorPopup";
import ReportOverlay from "@/components/ReportOverlay";

function Page({ params }) {
  const [talent, setTalent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [hourlyRate, setHourlyRate] = useState("");
  const [clients, setClients] = useState(null);
  const [searchClient, setSearchClient] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [searchJob, setSearchJob] = useState("");
  const [jobs, setFetchedJobs] = useState(null);
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [error, setError] = useState(null);
  const [isClientsShow, setIsClientShow] = useState(false);
  const [isJobsShow, setIsJobsShow] = useState(false);
  const [jobHistory, setJobHistory] = useState(null);
  const [isEditPrice, setIsEditPrice] = useState(false);
  const [editedPrice, setEditedPrice] = useState(talent?.hourly_rate);
  const [isReportOverlayOpened, setIsReportOverlayOpened] = useState(false);
  const [candidateReport, setCandidateReport] = useState(null);
  const router = useRouter();
  const [alert, setAlert] = useState(null);
  //const [error,setError]= useState(null)

  const customer_id = params?.candidateId;

  const handleCloseOverlay = () => {
    setIsReportOverlayOpened(false);
    //setSuccessAcknowledge(false);
  };
  const getCandidateResult = useCallback(() => {
    const payload = {
      endpoint: `get-customer-result?customer_id=${customer_id}`,
      method: "GET",
    };
    mvp2ApiHelper(payload).then((result) => {
      if (result) setCandidateReport(result?.data?.data);
    });
  }, [customer_id]);

  const filteredClients = clients?.filter((client) =>
    client.name.toLowerCase().includes(searchClient.toLowerCase()),
  );

  const filteredJobs = jobs?.filter(
    (job) =>
      job.position.toLowerCase().includes(searchJob.toLowerCase()) &&
      job?.job_status === "open",
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
  }, []);

  useEffect(() => {
    getCandidateResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer_id]);

  const fetchJobHistory = useCallback(async () => {
    const payload = {
      endpoint: `get-job-history-of-candidate?customer_id=${customer_id}`,
      method: "GET",
    };
    const response = await mvp2ApiHelper(payload);
    console.log(response?.data?.data);
    setJobHistory(response?.data?.data);
    //console.log(jobHistory)
  }, []);

  const saveEditedPrice = useCallback(async (price) => {
    if (isNaN(price) || price === null) {
      setError("price can only be a number");
      setAlert(true);
    } else {
      const payload = {
        endpoint: `profile-info-update/${customer_id}`,
        method: "PUT",
        body: {
          hourly_rate: price,
        },
      };

      try {
        const result = await mvp2ApiHelper(payload);

        if (result.status === 200) {
          console.log("Price updated successfully!");
        } else {
          console.error("Failed to update profile.");
        }
      } catch (error) {
        console.error("Error while updating profile:", error);
      }
      setIsEditPrice(false);
      router?.refresh();
    }
  }, []);

  useEffect(() => {
    fetchJobHistory();
  }, [customer_id]);

  useEffect(() => {
    fetchJobs();
  }, [searchJob]);

  useEffect(() => {
    let isMounted = true;
    const route = `customers`;

    async function fetchTalent() {
      try {
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/${route}?customer_id=${customer_id}`,
        );
        const result = await res.json();
        console.log(result);
        if (result.status !== 200) throw new Error(`Error: ${result.err}`);
        if (isMounted) setTalent(result.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTalent();

    return () => {
      isMounted = false;
    };
  }, [customer_id]);

  if (!talent) return <div>Loading...</div>;
  const commit = `${talent?.commitment} (${talent?.commitment === "full-time" ? "40" : "20"} hrs/wk)`;
  const showPaymentHistory = talent?.client_response === "accept";

  const talentDetails = [
    // {
    //   icon: "/icons/note-add.svg",
    //   name: "Est. length",
    //   content: talent?.job_postings?.project_length,
    // },
    {
      icon: "/icons/tag-user.svg",
      name: "Specialization",
      content: talent?.specialization,
    },

    {
      icon: "/icons/commitment.svg",
      name: "Commitment",
      content: commit,
    },
    {
      icon: "/icons/timer-start.svg",
      name: "Time zone",
      content: cityTimezoneOffset(talent?.city || "No city set"),
    },
    // {
    //   icon: "/icons/briefcase-tick.svg",
    //   name: "Job type",
    //   content: talent?.job_type,
    // },
  ];

  function parseDateString(dateString) {
    const [day, month, year] = dateString.split(" ");
    const monthIndex = new Date(Date.parse(month + " 1, 2024")).getMonth(); // Convert month name to index
    return new Date(year, monthIndex, day);
  }

  // Your formatted date string
  let endTrialDate = formatDate(talent?.updatedAt);

  // Parse the date string into a Date object
  let parsedDate = parseDateString(endTrialDate);

  // Add 14 days
  parsedDate.setDate(parsedDate.getDate() + 14);

  // Format the new date
  let newEndTrialDate = parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleReferCandidate = async () => {
    // e.preventDefault();

    const referClientBody = {
      client_id: selectedClientId,
      customer_id: talent.customer_id,
      job_posting_id: selectedJobId,
      hourly_rate: hourlyRate,
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
      <div
        className={`${
          showPaymentHistory ? "min-h-auto mb-2" : "min-h-full"
        } space-y-4 rounded-3xl bg-neutral-white p-6`}
      >
        <div className="top flex items-center justify-start gap-3">
          <Heading sm>Candidate Profile</Heading>

          <Capsule
            onClick={
              getCandidateStatus(talent?.talent_status, talent?.status) ===
              "Available"
                ? () => setShowForm(true)
                : null
            }
            className={`ml-auto cursor-not-allowed !bg-grey-primary-tint-90 ${
              getCandidateStatus(talent?.talent_status, talent?.status) ===
              "Available"
                ? "!text-primary-tint-10"
                : "!text-gray-500"
            }`}
          >
            Refer To Client
          </Capsule>

          <Capsule className="ml-auto !bg-grey-primary-tint-90 !text-primary-tint-10">
            {getCandidateStatus(talent?.talent_status, talent?.status)}
            {["available", "interviewing"].includes(
              getCandidateStatus(
                talent?.talent_status,
                talent?.status,
              ).toLowerCase(),
            ) ? null : (
              <>
                {formatDate(talent?.updatedAt)} - {newEndTrialDate}
              </>
            )}
          </Capsule>
        </div>
        <Hr />
        <div className="mini-profile flex items-center justify-between">
          <EntityCard
            entity={{
              image: "/avatars/avatar-1.png",
              name: talent?.name,
              profession: talent?.specialization,
            }}
          />
          {!isEditPrice ? (
            <Capsule className="ml-auto mt-auto" icon={<IconWithBg icon="$" />}>
              ${talent?.hourly_rate}hr
              <div
                onClick={() => setIsEditPrice(true)}
                className="cursor-pointer"
              >
                <Image src={"/icons/icon-edit.svg"} width={20} height={20} />
              </div>
            </Capsule>
          ) : (
            <div className="gap-2">
              <input
                className="rounded-[2.25rem] border-2 border-black px-4 py-3 text-sm font-medium capitalize"
                value={editedPrice}
                onChange={(event) => setEditedPrice(event.target.value)}
              />
              <ButtonCapsule onPress={() => saveEditedPrice(editedPrice)}>
                Save
              </ButtonCapsule>
            </div>
          )}
        </div>

        <div className="flex flex-row justify-center">
          <div className="flex flex-1 flex-col justify-start">
            <Heading xm>About</Heading>
            <Capsule className="flex w-fit flex-wrap items-center gap-2">
              <Image src={EmailSvg} />
              {talent?.email}
            </Capsule>
            
            <Capsule className="mb-2 mt-2 flex w-fit flex-wrap items-center gap-2">
              <Image src={phone} />
              {talent?.contact_no}
            </Capsule>

            <div className="text-grey-primary-shade-20">Top Skills</div>
            <div className="flex items-start gap-1.5">
              {talent?.expertise.map((skill, i) => (
                <Skill
                  key={i}
                  skill={skill.skill}
                  className="!bg-neutral-white"
                />
              ))}
            </div>

            <div className="mt-2 text-grey-primary-shade-20">
              Candidate Report
            </div>
            <Capsule
              className="ml-5 mt-4 w-1/2 !text-primary-tint-10"
              onClick={() => setIsReportOverlayOpened(true)}
            >
              View Report
            </Capsule>

            <Hr />

            <Heading xm>Address</Heading>
            <div className="flex items-start gap-1.5">
              <div>
                <DetailTag
                  icon="/icons/address.svg"
                  name="Address: "
                  content={talent?.customer_location || "No address"}
                />
                <DetailTag
                  icon="/icons/routing.svg"
                  name="City State: "
                  content={
                    talent?.city + talent?.province || "No city/state given"
                  }
                />
                <DetailTag
                  icon="/icons/location.svg"
                  name="Address: "
                  content={talent?.area_code || "No area code given"}
                />
              </div>
            </div>
          </div>

          {isReportOverlayOpened && (
            <ReportOverlay
              reportOverlay={isReportOverlayOpened}
              onClose={handleCloseOverlay}
              selectedCandidate={candidateReport}
            />
          )}

          <div className="mr-3 space-x-3">
            <Heading xm className="text-center">
              Job Information
            </Heading>
            <div className="grid grid-cols-2 grid-rows-4 gap-x-5 gap-y-5">
              {talentDetails.map((detail, i) => (
                <DetailTag
                  key={i}
                  icon={detail.icon}
                  name={detail.name}
                  content={detail.content}
                />
              ))}
            </div>
          </div>
        </div>
        {jobHistory && (
          <AdminCandidateJobHistory
            job_history={jobHistory}
            total_job_history={jobHistory?.length}
          />
        )}
      </div>

      {showPaymentHistory && <ClientPaymentHistoryTable />}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <h3 className="mb-4 text-xl font-semibold">
          Refer {talent?.role} to Client
        </h3>
        <form action={handleReferCandidate}>
          <label className="flex">
            Hourly Rate <div className="text-red-600">*</div>
          </label>
          <input
            name="hourlyRate"
            id="hourlyRate"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            required
            className="mt-2 block w-full border px-2 py-1"
          />
          <label className="mt-4 flex">
            Assign to Client <div className="text-red-600">*</div>
          </label>
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
          <label className="mt-4 flex">
            Select Job <div className="text-red-600">*</div>
          </label>
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
          {error && (
            <div className="error text-red-500">{error || error?.message}</div>
          )}
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
      {alert && (
        <ErrorPopup
          message={error}
          type="error"
          onClose={() => setAlert(false)}
        />
      )}
    </>
  );
}
export default Page;
