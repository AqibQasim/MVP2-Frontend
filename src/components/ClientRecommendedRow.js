import SvgIconJobStatus from "@/svgs/SvgIconJobStatus";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";
import SvgIconRequestInterview from "@/svgs/SvgIconRequestInterview";
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import { useState, useEffect, useRef } from "react";

function ClientRecommendedRow({ recommended }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  console.log(recommended);
  const { customer: candidate, job_postings: job } = recommended;

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
          {job.skills.map((skill, i) => (
            <>
              <SkillIconWithBg key={i} icon={skill} skill={skill} />
            </>
          ))}
        </div>
        <div className="job-title text-center">{job.position}</div>
        <div className="experience text-center">{candidate.experience}</div>
        <Capsule>{candidate.commitment}</Capsule>
        <Capsule
          onClick={() => setIsOpen(true)}
          className="ml-auto !bg-primary-tint-100"
          icon={<IconWithBg icon={<SvgIconRequestInterview />} />}
        >
          Request Interview
        </Capsule>
      </Table.Row>

      <PopupModal
        url="https://calendly.com/muhammad44aqib/30min"
        rootElement={document.getElementById("scheduleCallBtn")}
        text="Schedule Call"
        textColor="#fff"
        color="#000"
        height="200px"
        overflow="hidden"
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
        // styles={{
        //   height: '10px'
        // }}
        prefill={{
          guests: [`${candidate.email}`],
        }}
      />
    </>
  );
}

export default ClientRecommendedRow;
