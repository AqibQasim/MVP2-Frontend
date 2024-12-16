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
import EmailSvg from '../../public/icons/email.svg'
import { cityTimezoneOffset } from "@/utils/cityTimezoneOffset";
import { formatDate } from "@/utils/utility";
import ButtonCapsuleWhite from "./ButtonCapsuleWhite";
import Image from "next/image";
import Skill from "./Skill";

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
      content: `${talent?.job_postings?.workday_overlap}`,
      //content: `6 hrs (5 hrs required)`,
    },
    {
      icon: "/icons/clipboard-text.svg",
      name: "Job posted",
      content: formatDate(talent?.job_postings?.createdAt),
      //content: "1 Month ago",
    },
    {
      icon: "/icons/commitment.svg",
      name: "Commitment",
      content: commit,
    },
    {
      icon: "/icons/timer-start.svg",
      name: "Time zone",
      content: cityTimezoneOffset(talent?.customer?.city || "No city set"),
    },
    {
      icon: "/icons/briefcase-tick.svg",
      name: "Job type",
      content: talent?.job_postings?.job_type,
    },
    {
      icon: "/icons/calendar.svg",
      name: "Desired start date",
      content: formatDate(talent?.job_postings?.start_date),
    },
  ];

  function parseDateString(dateString) {
    const [day, month, year] = dateString.split(' ');
    const monthIndex = new Date(Date.parse(month +" 1, 2024")).getMonth(); // Convert month name to index
    return new Date(year, monthIndex, day);
  }
  
  // Your formatted date string
  let endTrialDate = formatDate(talent?.updatedAt);
  
  // Parse the date string into a Date object
  let parsedDate = parseDateString(endTrialDate);
  
  // Add 14 days
  parsedDate.setDate(parsedDate.getDate() + 14);
  
  // Format the new date
  let newEndTrialDate = parsedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  
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
            {talent?.customer?.talent_status} {formatDate(talent?.updatedAt)} - {newEndTrialDate}
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

        {/* <TalentDescription
          description={talent?.job_postings?.description}
          skills={talent?.job_postings?.skills}
        /> */}

        <div className="flex flex-row justify-center">
          <div className="justify-start flex-1 flex flex-col">
            <Heading xm>About</Heading>
            <Capsule className="w-fit flex items-center gap-2">
              <Image src={EmailSvg} />
              {talent?.customer?.email}
            </Capsule>

            <div className="text-grey-primary-shade-20">
              Top Skills
            </div>
            <div className="flex items-start gap-1.5">
              {talent.customer.expertise.map((skill, i) => (
                <>
                  <Skill key={i} skill={skill.skill} className="!bg-neutral-white" />

                </>
              ))}
            </div>
            <Hr />

            <Heading xm>Address</Heading>
            <div className="flex items-start gap-1.5">
              <div>
                <DetailTag icon="/icons/address.svg" name="Address: " content={talent?.customer?.customer_location || "No address"}/>
                <DetailTag icon="/icons/routing.svg" name="City State: " content={(talent?.customer?.city + talent.customer?.province) || "No city/state given"}/>
                <DetailTag icon="/icons/location.svg" name="Address: " content={talent?.customer?.area_code || "No area code given"}/>
              </div>
            </div>

          </div>
          <div className="gap-4">
            <Heading xm>Job Information</Heading>
            <div className="grid grid-cols-2 grid-rows-4 gap-x-8 gap-y-5">
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
