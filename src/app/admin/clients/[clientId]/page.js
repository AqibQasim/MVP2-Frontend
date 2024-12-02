"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
import { cityTimezoneOffset } from "@/utils/cityTimezoneOffset";
import { formatDate } from "@/utils/utility";
import ButtonCapsuleWhite from "@/components/ButtonCapsuleWhite";
import Image from "next/image";
import Skill from "@/components/Skill";
import AdminJobsList from "@/components/AdminJobsList";
import AdminCreateAJobModal from "@/components/AdminCreateAJobModal";
import { fetchCandidatesJobStatus } from "@/lib/data-service";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import AdminClientCandidatesTable from "@/components/AdminClientCandidatesTable";

function Page({ params }) {
  const [client, setClient] = useState(null);
  const client_id = params?.clientId;
  const [candidates, setCandidates] = useState(null);
  const [dataError, setDataError] = useState(null);

  //const [assignedCandidates, setAssignedCandidates]= useState(null);

  const fetchCandidates = async () => {
    const payload = {
      endpoint: `get-job-candidates?job_status=hired-trial-interviewing&client_id=${client_id}`,
      method: "GET",
    };
    const result = await mvp2ApiHelper(payload);
    if (result?.status === 200) {
      setCandidates(result.data);
    }
  };

  useEffect(() => {
    console.log(candidates);
  }, [candidates]);

  useEffect(() => {
    let isMounted = true;
    const route = `clients`;

    async function fetchClient() {
      try {
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/${route}?client_id=${client_id}`,
        );
        const result = await res.json();
        console.log(result);
        if (result.status !== 200) throw new Error(`Error: ${result.err}`);
        if (isMounted) setClient(result.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchClient();
    fetchCandidates();

    return () => {
      isMounted = false;
    };
  }, [client_id]);

  if (!client) return <div>Loading...</div>;

  function parseDateString(dateString) {
    const [day, month, year] = dateString.split(" ");
    const monthIndex = new Date(Date.parse(month + " 1, 2024")).getMonth(); // Convert month name to index
    return new Date(year, monthIndex, day);
  }

  return (
    <>
      <div
        className={`"min-h-auto mb-2" : "min-h-full"} space-y-4 rounded-3xl bg-neutral-white p-6`}
      >
        <div className="top flex items-center justify-between gap-3">
          {/* <ButtonBack /> */}
          <div>
            <ButtonCapsuleWhite />
            <Heading sm>Client Profile</Heading>
          </div>
          {/* <Capsule className="ml-auto !bg-grey-primary-tint-90 !text-primary-tint-10">
            {talent?.talent_status} {formatDate(talent?.updatedAt)} -{" "}
            {newEndTrialDate}
          </Capsule> */}
          <div>
            <Capsule>
              <AdminCreateAJobModal clientId={client.client_id} />
            </Capsule>
          </div>
        </div>
        <Hr />
        <div className="mini-profile flex items-center justify-start">
          <EntityCard
            entity={{
              image: "/avatars/avatar-1.png",
              name: client?.name,
              //   profession: talent?.specialization,
            }}
          />
          {/* <Capsule className="ml-auto mt-auto" icon={<IconWithBg icon="$" />}>
            ${talent?.hourly_rate}hr
          </Capsule> */}
        </div>

        {/* <TalentDescription
          description={talent?.job_postings?.description}
          skills={talent?.job_postings?.skills}
        /> */}

        <div className="flex justify-between">
          <div className="">
            <Heading xm>About</Heading>
            <Capsule className="flex w-fit flex-wrap items-center gap-2">
              <Image src={EmailSvg} />
              {client?.email}
            </Capsule>
          </div>

          <div className="">
            <Heading xm>Address</Heading>
            <div className="flex items-start gap-1.5">
              <div className="space-y-3">
                <DetailTag
                  icon="/icons/address.svg"
                  name="Address: "
                  content={client?.customer_location || "No address"}
                />
                <DetailTag
                  icon="/icons/routing.svg"
                  name="City State: "
                  content={
                    client?.city + client?.province || "No city/state given"
                  }
                />
                <DetailTag
                  icon="/icons/location.svg"
                  name="Address: "
                  content={client?.area_code || "No area code given"}
                />
              </div>
            </div>
          </div>
          <div />
        </div>
        <div>
          <div className="space-y-4">
            {client.job_postings && (
              <div
                //key={job.job_posting_id}
                className="job-posting-card h-fit rounded-lg border border-gray-300 p-4"
              >
                <AdminJobsList
                  jobs={client.job_postings}
                  totalJobs={client.job_postings?.length}
                />
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="job-posting-card mt-4 h-fit rounded-lg border border-gray-300 p-4">
              <AdminClientCandidatesTable candidates={candidates?.data} />
            </div>
          </div>
        </div>
      </div>
      {/* {showPaymentHistory && (
        <ClientPaymentHistoryTable
        // paymentHistory={paymentHistory}
        // clientId={client_id}
        />
      )} */}
    </>
  );
}

export default Page;
