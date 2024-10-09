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

function ClientRecommendationCard({
  client = {},
  recommendedCandidate = {},
  recommendedForJob = {},
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const getEventDetails = async (eventUri) => {
    try {
      const response = await fetch(eventUri, {
        headers: {
          Authorization: `Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI4NDY2NTQxLCJqdGkiOiIwZWNkMDU3YS0xZjI2LTQwYzctOGI3OC01OGFiNGFhYWQzNDciLCJ1c2VyX3V1aWQiOiJlODdmYmZhOS01YmUxLTRjNzEtOTFlYi1hODkzMDE3OTBhMWMifQ.Bdt_S_5FmvQpHZjJIjzbEY86erxCicLQYlTsoY0dXvCk4VQGWdaOg1cNiGe6E7Mu3LdCIThGWeoOeQTYZvVqPQ`, // Replace with your actual API key
        },
      });
      const data = await response.json();
      console.log("Event Details:", data);
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

  // useCalendlyEventListener({
  //   onProfilePageViewed: () => {
  //     console.log("//////////////////////////");
  //   },
  //   onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
  //   onEventTypeViewed: () => console.log("onEventTypeViewed"),
  //   onEventScheduled: (e) => console.log(e.data),
  //   onPageHeightResize: (e) => console.log(e.data.payload.height),
  // });

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
        <div className="space-y-4">
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
              <Skill score={8.0} />
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
                name: "Aqib", // Prefill the candidate's name
                email: "muhammad44aqib@gmail.com", // Prefill the candidate's email
                guests: [{ email: recommendedCandidate.email }], // Prefill the guests' email (if applicable)
              }}
            />
          </div>
        </div>
      )}
    </DashboardSection>
  );
}

export default ClientRecommendationCard;
