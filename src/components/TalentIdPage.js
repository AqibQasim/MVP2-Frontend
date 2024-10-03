"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonBack from "./ButtonBack";
import Capsule from "./Capsule";
import ClientPaymentHistoryTable from "./ClientPaymentHistoryTable";
import DetailTag from "./DetailTag";
import EntityCard from "./EntityCard";
import Heading from "./Heading";
import Hr from "./Hr";
import IconWithBg from "./IconWithBg";
import TalentDescription from "./TalentDescription";
import { cityTimezoneOffset } from "@/utils/cityTimezoneOffset";
import { formatDate } from "@/utils/utility";
import ButtonCapsuleWhite from "./ButtonCapsuleWhite";

function TalentIdPage({ client_id, customer_id }) {
  const [talent, setTalent] = useState(null);
  const searchParams = useSearchParams();
  const job_posting_id = searchParams.get("job_posting_id");

  useEffect(() => {
    let isMounted = true;
    const route = `get-all-candidates-of-clients-job`;

    async function fetchTalent() {
      try {
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/${route}?client_id=${client_id}&customer_id=${customer_id}&job_posting_id=${job_posting_id}`,
        );
        const result = await res.json();
        if (result.status !== 200) throw new Error(`Error: ${result.err}`);
        if (isMounted) setTalent(result.data.at(0));
      } catch (error) {
        console.error(error);
      }
    }

    fetchTalent();

    return () => {
      isMounted = false;
    };
  }, [client_id, customer_id, job_posting_id]);

  if (!talent) return <div>Loading...</div>;
  const commit = `${talent?.customer?.commitment} (${talent?.customer?.commitment === "full-time" ? "40" : "20"} hrs/wk)`;
  const showPaymentHistory = talent?.client_response === "accept";

  const talentDetails = [
    {
      icon: "/icons/note-add.svg",
      name: "Est. length",
      content: talent?.job_postings?.project_length,
    },
    {
      icon: "/icons/tag-user.svg",
      name: "Specialization",
      content: talent?.customer?.specialization,
    },
    {
      icon: "/icons/copy-success.svg",
      name: "Workday overlap",
      //   content: `${talent?.job_postings?.workday_overlap} (${talent?.job_postings?.workday_overlap} hrs required)`,
      content: `6 hrs (5 hrs required)`,
    },
    {
      icon: "/icons/clipboard-text.svg",
      name: "Job posted",
      //   content: formatDate(talent?.postings?.createdAt),
      content: "1 Month ago",
    },
    {
      icon: "/icons/commitment.svg",
      name: "Commitment",
      content: commit,
    },
    {
      icon: "/icons/timer-start.svg",
      name: "Time zone",
      content: cityTimezoneOffset(talent?.customer?.city || "delhi"),
    },
    {
      icon: "/icons/briefcase-tick.svg",
      name: "Job type",
      content: talent?.job_postings?.job_type,
    },
    {
      icon: "/icons/calendar.svg",
      name: "Desired start date",
      content: "Aug 24, 2024",
    },
  ];

  return (
    <>
      <div
        className={`${showPaymentHistory ? "min-h-auto mb-2" : "min-h-full"} space-y-4 rounded-3xl bg-neutral-white p-6`}
      >
        <div className="top flex items-center justify-start gap-3">
          {/* <ButtonBack /> */}
          <ButtonCapsuleWhite />
          <Heading sm>Profile Overview</Heading>
          <Capsule className="ml-auto !bg-grey-primary-tint-90 !text-primary-tint-10">
            Trial - 1st April - 14 April
          </Capsule>
        </div>
        <Hr />
        <div className="mini-profile flex items-center justify-start">
          <EntityCard
            entity={{
              image: "/avatars/avatar-1.png",
              name: talent.customer.name,
              profession: talent.customer.specialization,
            }}
          />
          <Capsule className="ml-auto mt-auto" icon={<IconWithBg icon="$" />}>
            ${talent?.customer?.hourly_rate}hr
          </Capsule>
        </div>

        <TalentDescription
          description={talent?.job_postings?.description}
          skills={talent?.job_postings?.skills}
        />

        <div className="grid grid-cols-3 grid-rows-3 gap-x-8 gap-y-4.5">
          {/* <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-items-start gap-x-8 gap-y-4.5"> */}
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
      {showPaymentHistory && (
        <ClientPaymentHistoryTable
        // paymentHistory={paymentHistory}
        // clientId={client_id}
        />
      )}
    </>
  );
}

export default TalentIdPage;
