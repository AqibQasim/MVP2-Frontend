"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
//import ButtonBack from "./ButtonBack";
import Capsule from "@/components/Capsule";
import ClientPaymentHistoryTable from "@/components/ClientPaymentHistoryTable";
import DetailTag from "@/components/DetailTag";
import EntityCard from "@/components/EntityCard";
import Heading from "@/components/Heading";
import Hr from "@/components/Hr";
import EmailSvg from "../../../../public/icons/email.svg";
import phone from "../../../../public/icons/Call.png";
import {
  relateCandidateTimezoneWithClientTimezone,
} from "@/utils/cityTimezoneOffset";
import { formatDate } from "@/utils/utility";
import Image from "next/image";
import Skill from "@/components/Skill";
import { fetchClientJobs, getClients } from "@/lib/data-service";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import AdminCandidateJobHistory from "@/components/AdminCandidateJobHistory";
import getCandidateStatus from "@/utils/getCandidateStatus";
import ErrorPopup from "@/components/ErrorPopup";
import ReportOverlay from "@/components/ReportOverlay";
import Experience from "@/components/Experience";
import IconWithBg from "@/components/IconWithBg";
import Education from "@/components/Education";


function Page({ params }) {
  const [talent, setTalent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [hourlyRate, setHourlyRate] = useState("");
  const [clients, setClients] = useState(null);
  const [searchClient, setSearchClient] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [searchJob, setSearchJob] = useState("");
  const [jobs, setFetchedJobs] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [error, setError] = useState(null);
  const [isClientsShow, setIsClientShow] = useState(false);
  const [isJobsShow, setIsJobsShow] = useState(false);
  const [jobHistory, setJobHistory] = useState(null);
  const [isReportOverlayOpened, setIsReportOverlayOpened] = useState(false);
  const [candidateReport, setCandidateReport] = useState(null);
  const [budgetingError, setBudgetingError] = useState(false);
  const router = useRouter();
  const [alert, setAlert] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState(null);
  //const [error,setError]= useState(null)

  const customer_id = params?.candidateId;

  const getPaymentHistory = () => {
    const payload = {
      endpoint: `get-hiring-payments?customer_id=${params?.candidateId}`,
      method: "GET",
    };
    mvp2ApiHelper(payload)
      .then((result) => {
        setPaymentHistory(result?.data?.data || []);
      })
      .catch((error) =>
        console.error("Error fetching payment history:", error),
      );
  };

  const handleChangeCandidateAvailabilityStatus = async (value) => {
    console.log("Selected Value:", value);

    try {
      const payload = {
        method: "PUT",
        endpoint: "status",
        body: {
          customer_id: talent?.customer_id,
          status: value,
        },
      };

      const res = await mvp2ApiHelper(payload);
      console.log("API Response:", res);

      if (res.status === 200) {
        console.log("Status updated successfully!");
        window.location.reload();
      } else {
        console.error("Status change failed:", res);
      }
    } catch (error) {
      console.error("Error in changeStatus:", error);
    }
  };

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

  const fetchClients = useCallback(async () => {
    const f = await getClients();
    if (f.status === 200) {
      setClients(f.data);
    }
  }, []);

  // Options for the dropdown
  const options = [
    { value: "active", label: "Available" },
    { value: "in-active", label: "Un-Available" },
  ];

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

  useEffect(() => {
    fetchJobHistory();
    getPaymentHistory();
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

  if (!talent) return <div className="flex size-full items-center justify-center">
    <div class="loader2"></div>
  </div>;
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
      content: relateCandidateTimezoneWithClientTimezone(talent?.city), //cityTimezoneOffset(talent?.city || "No city set"),
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

  console.log('talents', talent)

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

  return (
    <div className="h-full overflow-y-scroll">
      <div
        className={`${showPaymentHistory ? "min-h-auto mb-2" : "min-h-full"
          } space-y-10 rounded-3xl bg-neutral-white p-6`}
      >
        <div className="top flex items-center justify-start gap-3">
          <Heading sm>Candidate Profile</Heading>

          {/* <Capsule
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
          </Capsule> */}

          <Capsule className="ml-auto !bg-grey-primary-tint-90 !text-primary-tint-10">
            {getCandidateStatus(talent?.talent_status, talent?.status)}
            {["available", "interviewing", "un-available"].includes(
              getCandidateStatus(
                talent?.talent_status,
                talent?.status,
              ).toLowerCase(),
            ) ? null : (
              <>
                <div></div>
                {formatDate(talent?.updatedAt)} - {newEndTrialDate}
              </>
            )}
          </Capsule>
        </div>
        <Hr />
        <div className="mini-profile flex items-center justify-between">
          <EntityCard
            entity={{
              image: "/avatars/avatar-2.png",
              name: talent?.name,
              profession: talent?.specialization,
            }}
          />
          <Capsule className="ml-auto mt-auto" icon={<IconWithBg icon="$" />}>
            Hourly Rate: ${talent?.hourly_rate}hr
            <div
              onClick={() => setIsEditPrice(true)}
              className="cursor-pointer"
            >
            </div>
          </Capsule>

          {/* <div className="gap-2">
              <input
                className="rounded-[2.25rem] border-2 border-black px-4 py-3 text-sm font-medium capitalize"
                value={editedPrice}
                onChange={(event) => setEditedPrice(event.target.value)}
              />
              <ButtonCapsule onPress={() => saveEditedPrice(editedPrice)}>
                Save
              </ButtonCapsule>
            </div> */}
          {/* )} */}
        </div>

        <div className="flex flex-row justify-center">
          <div className="flex flex-1 flex-col justify-start">
            <Heading xm>About</Heading>
            <Capsule
              className="flex w-fit flex-wrap items-center gap-2"
              style={{ textTransform: "lowercase" }}
            >
              <Image src={EmailSvg} />
              {talent?.email}
            </Capsule>

            <Capsule className="mb-2 mt-2 flex w-fit flex-wrap items-center gap-2">
              <Image src={phone} />
              {talent?.contact_no}
            </Capsule>


            <div className="mt-2 text-grey-primary-shade-20">
              Candidate Report
            </div>
            <Capsule
              className="ml-5 mt-4 w-1/2 !text-primary-tint-10"
              onClick={() => setIsReportOverlayOpened(true)}
            >
              View Report
            </Capsule>

            <Hr className={"w-3/4"} />

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
                  content={talent?.city || "No city/state given"}
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

          <div className="mr-3 space-x-3 w-1/2">
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

            <Heading xm className="text-center pb-2">
              About
            </Heading>
            <div>{talent?.description}</div>
            {/* <AvailabilityDropdown
              options={options}
              placeholder="Change Availability Status"
              value={selectedAvailabilityValue}
              onChange={handleChangeCandidateAvailabilityStatus}
              className="text-sm font-bold"
            /> */}

            <div className="flex w-full !items-start flex-col pt-10">
              <Heading xm>Skills</Heading>
              {talent?.expertise.map((skill, i) => (
                <Skill
                  key={i}
                  skill={skill.skill}
                  className="!bg-neutral-white"
                />
              ))}
            </div>


          </div>
        </div>
        {/* {jobHistory && (
          <AdminCandidateJobHistory
            job_history={jobHistory}
            total_job_history={jobHistory?.length}
          />
        )} */}
        <div className="flex self-center w-full h-auto flex-col gap-y-4">
          <Heading xm>Work Experience</Heading>

          {
            talent?.work_experience?.map((exp,index) => (
              <Experience key={index?.toString()} {...exp} />
            ))
          }
          
        </div>

        <div className="flex self-center w-full h-auto flex-col gap-y-4">
          <Heading xm>Education</Heading>

          {
            talent?.education?.map((edu,index) => (
              <Education key={index?.toString()} {...edu} />
            ))
          }
          
        </div>
      </div>

      {/* {showPaymentHistory && <ClientPaymentHistoryTable />} */}

      {/* {alert && (
        <ErrorPopup
          message={error}
          type="error"
          onClose={() => setAlert(false)}
        />
      )} */}
    </div>
  );
}
export default Page;
