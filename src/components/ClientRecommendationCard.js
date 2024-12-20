"use client";

import { useState, useEffect, useRef } from "react";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { useParams } from "next/navigation";
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import Capsule from "@/components/Capsule";
import DashboardSection from "@/components/DashboardSection";
import EntityCard from "@/components/EntityCard";
import Heading from "@/components/Heading";
import Skill from "@/components/Skill";
import ButtonCapsule from "./ButtonCapsule";
import { formatCurrency } from "@/utils/utility";
import IconWithBg from "./IconWithBg";

function ClientRecommendationCard({
  admin_hourly_rate,
  client = {},
  recommendedCandidate = {},
  recommendedForJob = {},
  scheduleInterview,
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [timer, setTimer] = useState(null);
  const [interviewTime, setInterviewTime] = useState(null);
  const [score, setScore] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const params = useParams();

  // Calculate remaining time in dd:hh:mm:ss format
  const calculateTimeLeft = (endTime) => {
    const endTimeStamp = new Date(endTime).getTime();
    const now = new Date().getTime();
    const distance = endTimeStamp - now;

    if (distance <= 0) return "Time's Up!";

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Fetch candidate result and calculate score
  const getCandidateResult = () => {
    const payload = {
      endpoint: `get-customer-result?customer_id=${recommendedCandidate?.customer_id}`,
      method: "GET",
    };
    mvp2ApiHelper(payload).then((result) => {
      if (result) {
        let res = result?.data?.data?.result;
        res = (res?.softskillRating + res?.technicalRating) / 2 || 0;
        setScore(res);
      }
    });
  };

  // Fetch event details from Calendly and schedule interview
  const getEventDetails = async (eventUri) => {
    try {
      const response = await fetch(eventUri, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CALENDLY_TOKEN}`,
        },
      });
      const data = await response.json();

      if (!data?.resource?.start_time) {
        throw new Error("start_time is missing from Calendly API response.");
      }

      const interviewDate = new Date(data.resource.start_time);
      setInterviewTime(interviewDate);
      setTimer(calculateTimeLeft(interviewDate));

      // Schedule interview with the backend
      const payload = {
        endpoint: "schedule-interview",
        method: "POST",
        body: {
          customer_id: recommendedCandidate?.customer_id,
          interview_date: data.resource.start_time,
          interview_time: data.resource.start_time,
          job_posting_id: recommendedForJob?.job_posting_id,
          client_id: params?.clientId,
        },
      };
      const result = await mvp2ApiHelper(payload);
      if (result.status === 200) {
        console.log("Interview has been scheduled");
      }

      // if ("serviceWorker" in navigator && "PushManager" in window) {
      //   navigator.serviceWorker
      //     .register("/sw.js", {
      //       scope: "/",
      //     })
      //     .then(async (swRegistration) => {
      //       const existingSubscription =
      //         await swRegistration.pushManager.getSubscription();
      //       if (existingSubscription) {
      //         // Unsubscribe if the applicationServerKey is different
      //         console.log("Unsubscribing existing subscription...");
      //         await existingSubscription.unsubscribe();
      //       }
      //       const subscription = await swRegistration.pushManager.subscribe({
      //         userVisibleOnly: true,
      //         applicationServerKey: urlBase64ToUint8Array(
      //           process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      //         ),
      //       });
      //       const payload = {
      //         endpoint: "schedule-interview",
      //         method: "POST",
      //         body: {
      //           customer_id: recommendedCandidate?.customer_id,
      //           interview_date: data?.resource?.start_time,
      //           interview_time: data?.resource?.start_time,
      //           job_posting_id: recommendedForJob?.job_posting_id,
      //           client_id: params?.clientId,
      //           subscription
      //         },
      //       };
      //       console.log(payload);
      //       const result = await mvp2ApiHelper(payload);
      //       if (result.status === 200) {
      //         console.log("Interview has been scheduled");
      //       }
      //       console.log("Push subscription:", subscription);
      //       // Send the subscription object to your backend
      //     })
      //     .catch((error) => {
      //       console.error("Service Worker registration failed:", error);
      //     });
      // }

      // Access the date and time from the response, e.g., data.start_time
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
    const savedTime = localStorage.getItem("interviewTime");
    if (savedTime) {
      setInterviewTime(new Date(savedTime));
      setTimer(calculateTimeLeft(new Date(savedTime)));
    }
  }, []);

  useEffect(() => {
    if (interviewTime) {
      localStorage.setItem("interviewTime", interviewTime.toISOString());
    }
  }, [interviewTime]);

  // Update the timer every second when interview is scheduled
  useEffect(() => {
    let timerInterval;
    if (scheduleInterview === "scheduled" && interviewTime) {
      timerInterval = setInterval(() => {
        setTimer(calculateTimeLeft(interviewTime));
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [scheduleInterview, interviewTime]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <DashboardSection
      paragraph={`Hey ${client?.name}, here's your new`}
      heading="Recommendations"
    >
      <div className="scheduleCallBtn space-y-4">
        <div className="flex items-start justify-between">
          <EntityCard
            entity={{
              image: "/avatars/avatar-1.png",
              name: recommendedCandidate?.name,
              profession: recommendedCandidate?.specialization,
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
              <p className="">{formatCurrency(admin_hourly_rate)}</p>
            </Capsule>
          </div>
        </div>
        <Heading xm> {recommendedForJob?.position} </Heading>
        <div className="cta flex items-center justify-between">
          <div className="flex items-center justify-start gap-1">
            {recommendedForJob?.skills?.map((skill) => (
              <Skill key={skill} icon={skill} skill={skill} />
            ))}
            <span className="h-[1px] w-2 rounded-full bg-grey-primary-tint-40"></span>
            <Skill score={score} />
          </div>

          {scheduleInterview === "scheduled" ? (
            <div>
              <Heading xm disabled>
                {" "}
                Interview Scheduled{" "}
              </Heading>
              <p className="text-sm">Time left: {timer}</p>
            </div>
          ) : (
            <ButtonCapsule
              ref={buttonRef}
              onPress={() => setIsOpen(true)}
              id="root"
            >
              Schedule Interview
            </ButtonCapsule>
          )}

          <PopupModal
            url={"https://calendly.com/co-ventech01/30min"}
            rootElement={document.getElementById("scheduleCallBtn")}
            text="Schedule Call"
            textColor="#fff"
            color="#000"
            height="200px"
            overflow="hidden"
            onModalClose={() => setIsOpen(false)}
            open={isOpen}
            prefill={{
              name: client?.name,
              email: [client?.email],
              guests: [recommendedCandidate.email],
            }}
          />
        </div>
      </div>
    </DashboardSection>
  );
}

export default ClientRecommendationCard;
