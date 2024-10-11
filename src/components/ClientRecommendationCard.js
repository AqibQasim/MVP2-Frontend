"use client";

import Capsule from "@/components/Capsule";
import DashboardSection from "@/components/DashboardSection";
import EntityCard from "@/components/EntityCard";
import Heading from "@/components/Heading";
import Skill from "@/components/Skill";
import { formatCurrency, formatCurrencyNoDecimals } from "@/utils/utility";
import IconWithBg from "./IconWithBg";
import ScheduleInterviewModal from "./ScheduleInterviewModal";
import ButtonCapsule from "./ButtonCapsule";
import { useState, useRef, useEffect } from "react";
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { useParams } from "next/navigation";

function ClientRecommendationCard({
  client = {},
  recommendedCandidate = {},
  recommendedForJob = {},
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const [score, setScore] = useState(null);
  const params = useParams();

  const getCandidateResult = () => {
    const payload = {
      endpoint: `get-customer-result?customer_id=${recommendedCandidate?.customer_id}`,
      method: "GET",
    };
    mvp2ApiHelper(payload).then((result) => {
      if (result) {
        let res = result?.data?.data?.result;
        console.log(result?.data?.data?.result);
        res = (res?.softskillRating + res?.technicalRating) / 2 || 0;
        setScore(res);
      }
    });
  };

  useEffect(() => {
    getCandidateResult();
  }, []);

  const getEventDetails = async (eventUri) => {
    try {
      const response = await fetch(eventUri, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CALENDLY_TOKEN}`, // Replace with your actual API key
        },
      });
      const data = await response.json();
      console.log("Event Details:", data);
      const payload = {
        endpoint: "schedule-interview",
        method: "POST",
        body: {
          customer_id: recommendedCandidate?.customer_id,
          interview_date: data?.resource?.start_time,
          interview_time: data?.resource?.start_time,
          job_posting_id: recommendedForJob?.job_posting_id,
          client_id: params?.clientId,
        },
      };
      console.log(payload);
      const result = await mvp2ApiHelper(payload);
      if (result.status === 200) {
        console.log("Interview has been scheduled");
      }
      // Access the date and time from the response, e.g., data.start_time
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      console.log("Fetching event details from:", e.data.payload.event.uri);
      getEventDetails(e.data.payload.event.uri);
    },
  });

  useEffect(() => {
    setIsMounted(true);
    console.log("mounted");
  }, []);
  if (!isMounted) return null;

  return (
    <DashboardSection
      paragraph={`Hey ${client.name}, here's your new`}
      heading="Recommendations"
    >
      {!recommendedCandidate?.name ? (
        <p>No data to show</p>
      ) : (
        <div className="scheduleCallBtn space-y-4">
          <div className="flex items-start justify-between">
            <EntityCard
              entity={{
                image: "/avatars/avatar-1.png",
                name: recommendedCandidate.name,
                profession: recommendedCandidate.specialization,
              }}
            />
            <div className="capsules inline-flex items-center justify-center gap-[6px]">
              <Capsule>
                <p> {recommendedCandidate.experience} </p>
              </Capsule>
              <Capsule>
                <p> {recommendedForJob.job_type} </p>
              </Capsule>
              <Capsule icon={<IconWithBg icon="$" />}>
                <p className="">
                  {formatCurrency(recommendedCandidate.hourly_rate)}
                </p>
              </Capsule>
            </div>
          </div>
          <Heading xm> {recommendedForJob.position} </Heading>
          <div className="cto flex items-center justify-between">
            <div className="flex items-center justify-start gap-1">
              {recommendedForJob.skills?.map((skill) => (
                <Skill key={skill} icon={skill} skill={skill} />
              ))}
              <span className="h-[1px] w-2 rounded-full bg-grey-primary-tint-40"></span>
              <Skill score={score} />
            </div>
            {/* ScheduleInterview */}
            {/* <ScheduleInterviewModal /> */}
            <ButtonCapsule
              ref={buttonRef}
              onPress={() => setIsOpen(true)}
              id="root"
            >
              Schedule Inverview
            </ButtonCapsule>

            <PopupModal
              onDateAndTimeSelected={() =>
                console.log("date and time selected")
              }
              url={"https://calendly.com/muhammad44aqib/30min"}
              rootElement={document.getElementById("scheduleCallBtn")}
              text="Schedule Call"
              textColor="#fff"
              color="#000"
              height="200px"
              overflow="hidden"
              onModalClose={() => setIsOpen(false)}
              open={isOpen}
              prefill={{
                guests: [recommendedCandidate.email], // Prefill the guests' email (if applicable)
              }}
            />
          </div>
        </div>
      )}
    </DashboardSection>
  );
}

export default ClientRecommendationCard;
