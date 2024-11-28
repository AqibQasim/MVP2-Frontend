"use client";

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
import urlBase64ToUint8Array from "@/utils/urlBase64ToUint8Array";

function ClientRecommendedRow({ recommended }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isInterviewScheduled, setIsInterviewScheduled] = useState(false);
  const buttonRef = useRef(null);
  const params = useParams();

  const { customer: candidate, job_postings: job } = recommended;

  useEffect(() => {
    // console.log("Requesting notification permission...");
    requestNotificationPermission();
  }, []);
  // Request Notification Permission
  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const isAcceptedNotification = await Notification.requestPermission();
      if (isAcceptedNotification === "granted") {
        sendNotification();
      } else {
        console.warn("notification permission denied");
      }
    } else {
      console.error("This browser does not support notifications.");
    }
  };
  // Send a Notification
  const sendNotification = () => {
    // if ("Notification" in window) {
    //   console.log("Sending notification...");
    //   new Notification("Hello!", {
    //     body: "This is your notification.",
    //     //icon: "/icon.png", // Optional: Add an icon
    //   });
    // } else {
    //   console.error("Notifications are not supported in this browser.");
    // }
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .register("/sw.js", {
          scope: "/",
        })
        .then(async (swRegistration) => {
          const existingSubscription =
            await swRegistration.pushManager.getSubscription();
          if (existingSubscription) {
            // Unsubscribe if the applicationServerKey is different
            console.log("Unsubscribing existing subscription...");
            await existingSubscription.unsubscribe();
          }
          const subscription = await swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
            ),
          });
          console.log("Push subscription:", subscription);
          // Send the subscription object to your backend
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  };


  const checkInterviewStatus = () => {
    const payload = {
      endpoint: `check-interview-status?customer_id=${candidate?.customer_id}&client_id=${params?.clientId}&job_posting_id=${job?.job_posting_id}`,
      method: "GET",
    };
    mvp2ApiHelper(payload).then((result) => {
      if (result?.data?.data?.is_scheduled) {
        setIsInterviewScheduled(true);
      } else {
        setIsInterviewScheduled(false); 
      }
    });
  };
 


  useEffect(() => {
    checkInterviewStatus();
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

      if ("serviceWorker" in navigator && "PushManager" in window) {
        navigator.serviceWorker
          .register("/sw.js", {
            scope: "/",
          })
          .then(async (swRegistration) => {
            const existingSubscription =
              await swRegistration.pushManager.getSubscription();
            if (existingSubscription) {
              // Unsubscribe if the applicationServerKey is different
              console.log("Unsubscribing existing subscription...");
              await existingSubscription.unsubscribe();
            }
            const subscription = await swRegistration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
              ),
            });
            const payload = {
              endpoint: "schedule-interview",
              method: "POST",
              body: {
                customer_id: candidate?.customer_id,
                interview_date: data?.resource?.start_time,
                interview_time: data?.resource?.start_time,
                job_posting_id: job?.job_posting_id,
                client_id: params?.clientId,
                subscription
              },
            };
            console.log(payload);
            const result = await mvp2ApiHelper(payload);
            if (result.status === 200) {
              console.log("Interview has been scheduled");
            }
            console.log("Push subscription:", subscription);
            // Send the subscription object to your backend
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
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
            
            Schedule Interview
          </Capsule>
        ) : (
          <Capsule
            onClick={() => setIsOpen(true)}
            ref={buttonRef}
            id = "root"
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
