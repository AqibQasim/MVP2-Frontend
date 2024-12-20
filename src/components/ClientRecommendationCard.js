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
import urlBase64ToUint8Array from "@/utils/urlBase64ToUint8Array";

function ClientRecommendationCard({
  admin_hourly_rate,
  client = {},
  recommendedCandidate = {},
  recommendedForJob = {},
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const [isInterviewScheduled, setIsInterviewScheduled] = useState(false);
  const [score, setScore] = useState(null);
  const params = useParams();

  // useEffect(() => {
  //   // console.log("Requesting notification permission...");
  //   requestNotificationPermission();
  // }, []);
  // // Request Notification Permission
  // const requestNotificationPermission = async () => {
  //   if ("Notification" in window) {
  //     const isAcceptedNotification = await Notification.requestPermission();
  //     if (isAcceptedNotification === "granted") {
  //       sendNotification();
  //     } else {
  //       console.warn("notification permission denied");
  //     }
  //   } else {
  //     console.error("This browser does not support notifications.");
  //   }
  // };
  // // Send a Notification
  // const sendNotification = () => {
  //   // if ("Notification" in window) {
  //   //   console.log("Sending notification...");
  //   //   new Notification("Hello!", {
  //   //     body: "This is your notification.",
  //   //     //icon: "/icon.png", // Optional: Add an icon
  //   //   });
  //   // } else {
  //   //   console.error("Notifications are not supported in this browser.");
  //   // }
  //   if ("serviceWorker" in navigator && "PushManager" in window) {
  //     navigator.serviceWorker
  //       .register("/sw.js", {
  //         scope: "/",
  //       })
  //       .then(async (swRegistration) => {
  //         const existingSubscription =
  //           await swRegistration.pushManager.getSubscription();
  //         if (existingSubscription) {
  //           // Unsubscribe if the applicationServerKey is different
  //           console.log("Unsubscribing existing subscription...");
  //           await existingSubscription.unsubscribe();
  //         }
  //         const subscription = await swRegistration.pushManager.subscribe({
  //           userVisibleOnly: true,
  //           applicationServerKey: urlBase64ToUint8Array(
  //             process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  //           ),
  //         });
  //         console.log("Push subscription:", subscription);
  //         // Send the subscription object to your backend
  //       })
  //       .catch((error) => {
  //         console.error("Service Worker registration failed:", error);
  //       });
  //   }
  // };

  // useEffect(() => {
  //   if (isInterviewScheduled) {
  //     // Check permission before sending notification
  //     // if (Notification.permission === "granted") {
  //     //   new Notification("Interview Scheduled", {
  //     //     body: "The interview has been successfully scheduled!",
  //     //   });
  //     // }
  //     sendNotification();
  //   }
  // }, [isInterviewScheduled]);

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

  const checkInterviewStatus = () => {
    const payload = {
      endpoint: `check-interview-status?customer_id=${recommendedCandidate?.customer_id}&client_id=${params?.clientId}&job_posting_id=${recommendedForJob?.job_posting_id}`,
      method: "GET",
    };
    mvp2ApiHelper(payload).then((result) => {
      if (result?.data?.data?.is_scheduled) {
        setIsInterviewScheduled(true); // Set as scheduled if API confirms
      }
    });
  };

  useEffect(() => {
    getCandidateResult();
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

      const payload = {
        endpoint: "schedule-interview",
        method: "POST",
        body: {
          customer_id: recommendedCandidate?.customer_id,
          interview_date: data?.resource?.start_time,
          interview_time: data?.resource?.start_time,
          job_posting_id: recommendedForJob?.job_posting_id,
          client_id: params?.clientId,
          //subscription
        },
      };
      console.log(payload);
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
      paragraph={`Hey ${client?.name}, here's your new`}
      heading="Recommendations"
    >
      {/* {!recommendedCandidate?.name ? (
        <p>No data to show</p>
      ) : ( */}
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
          <div className="cto flex items-center justify-between">
            <div className="flex items-center justify-start gap-1">
              {recommendedForJob?.skills?.map((skill) => (
                <Skill key={skill} icon={skill} skill={skill} />
              ))}
              <span className="h-[1px] w-2 rounded-full bg-grey-primary-tint-40"></span>
              <Skill score={score} />
            </div>
            {/* ScheduleInterview */}
            {/* <ScheduleInterviewModal /> */}
            {isInterviewScheduled ? (
              <Heading xm disabled>
                Interview Already Scheduled
              </Heading>
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
              onDateAndTimeSelected={() =>
                console.log("date and time selected")
              }
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
                guests: [recommendedCandidate.email], // Prefill the guests' email (if applicable)
              }}
            />
          </div>
        </div>
      {/* )} */}
    </DashboardSection>
  );
}

export default ClientRecommendationCard;
