yui"use client";

import SvgIconJobStatus from "@/svgs/SvgIconJobStatus";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";
import SvgIconRequestInterview from "@/svgs/SvgIconRequestInterview";
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import { useState, useEffect, useRef } from "react";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { useParams } from "next/navigation";

function ClientRecommendedRow({ recommended }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isInterviewScheduled, setIsInterviewScheduled] = useState(false);
  const buttonRef = useRef(null);
  const params = useParams();

  const { customer: candidate, job_postings: job } = recommended;

  const checkInterviewStatus = () => {
    const payload = {
      endpoint: `check-interview-status?customer_id=${candidate?.customer_id}&client_id=${params?.clientId}&job_posting_id=${job?.job_posting_id}`,
      method: "GET",
    };
    mvp2ApiHelper(payload).then((result) => {
      if (result?.data?.data?.is_scheduled) {
        setIsInterviewScheduled(true);
      }
    });
  };

  const getEventDetails = async (eventUri) => {
    try {
      const response = await fetch(eventUri, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CALENDLY_TOKEN}`,
        },
      });
      const data = await response.json();
      const payload = {
        endpoint: "schedule-interview",
        method: "POST",
        body: {
          customer_id: candidate?.customer_id,
          interview_date: data?.resource?.start_time,
          interview_time: data?.resource?.start_time,
          job_posting_id: job?.job_posting_id,
          client_id: params?.clientId,
        },
      };
      const result = await mvp2ApiHelper(payload);
      if (result.status === 200) {
        console.log("Interview has been scheduled");
        setIsInterviewScheduled(true);
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      getEventDetails(e.data.payload.event.uri);
    },
  });

  useEffect(() => {
    checkInterviewStatus();
    setIsMounted(true);
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
          {job.skills.length > 1 ? (
            <>
              <SkillIconWithBg icon={job.skills[0]} skill={job.skills[0]} />
              <div className="text-sm text-gray-500">+{job.skills.length - 1}</div>
            </>
          ) : (
            <SkillIconWithBg icon={job.skills[0]} skill={job.skills[0]} />
          )}
        </div>
        <div className="job-title text-center">{job.position}</div>
        <div className="experience text-center">{candidate.experience}</div>
        <Capsule>{candidate.commitment}</Capsule>
        {isInterviewScheduled ? (
          <Capsule
            className="ml-auto !bg-primary-tint-100 cursor-not-allowed"
            icon={<IconWithBg icon={<SvgIconRequestInterview />} />}
          >
            Interview Already Scheduled
          </Capsule>
        ) : (
          <Capsule
            onClick={() => setIsOpen(true)}
            className="ml-auto !bg-primary-tint-100"
            icon={<IconWithBg icon={<SvgIconRequestInterview />} />}
          >
            Schedule Interview
          </Capsule>
        )}
      </Table.Row>

      <PopupModal
        url="https://calendly.com/co-ventech01/30min"
        rootElement={document.getElementById("scheduleCallBtn")}
        text="Schedule Call"
        textColor="#fff"
        color="#000"
        height="200px"
        overflow="hidden"
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
        prefill={{
          guests: [`${candidate.email}`],
        }}
      />
    </>
  );
}

export default ClientRecommendedRow;
