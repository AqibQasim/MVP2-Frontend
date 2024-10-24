"use client";
import { useState, useRef, useEffect } from "react";
import SvgIconNotification from "@/svgs/SvgIconNotification";
import SvgIconSettings from "@/svgs/SvgIconSettings";
import { formatDate } from "@/utils/utility";
import ButtonRounded from "./ButtonRounded";
import EntityCard from "./EntityCard";
import ScheduleCallModal from "./ScheduleCallModal";
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import Modal from "./AdminJobsFormModal";
import ButtonCapsule from "./ButtonCapsule";
import { useRouter } from "next/navigation";

function ClientHeader({ client, client_id }) {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  console.log("client information : ", client);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-CA"); // Formats to YYYY-MM-DD
  };

  const getEventDetails = async (eventUri) => {
    try {
      const response = await fetch(eventUri, {
        headers: {
          Authorization: `Bearer ${processs.env.NEXT_PUBLIC_CALENDLY_TOKEN}`, // Replace with your actual API key
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    console.log("mounted");
  }, []);
  if (!isMounted) return null;

  return (
    <>
      <div className="flex" id="scheduleCallBtn">
        <EntityCard
          lg
          entity={{
            image: "/avatars/avatar-2.png",
            name: client.name,
            profession: client.email,
          }}
        />
        <div className="info ml-auto space-y-4">
          <div className="buttons flex items-start justify-end gap-2">
            <EntityCard
              sm
              entity={{
                image: "/avatars/avatar-3.svg",
                name: "Esther Howard",
                profession: "Account Executive - AE",
              }}
            />
            {/* schedule-call */}
            {/* <ScheduleCallModal /> */}
            <ButtonRounded
              onClick={() => {
                //open notification screen
                //console.log("notification pressed")
                router.push(`/client/${client_id}/notifications`);
              }}
            >
              <SvgIconNotification />
            </ButtonRounded>
            <ButtonRounded
              onClick={() => {
                //open notification screen
                //console.log("notification pressed")
                router.push(`/client/${client_id}/settings`);
              }}
            >
              <SvgIconSettings />
            </ButtonRounded>

            {isClient && (
              <div>
                <ButtonCapsule
                  ref={buttonRef}
                  onPress={() => setIsOpen(true)}
                  //id="scheduleCallBtn"
                >
                  Schedule a Call
                </ButtonCapsule>
              </div>
            )}
          </div>
          <div className="join-date float-right">
            <p className="capitalize text-grey-primary-shade-10">
              Joined date:{" "}
              <span className="font-semibold">
                {formatDate(client?.createdAt)}
              </span>
            </p>
          </div>
        </div>
      </div>
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
          name: client?.name,
          email: [client?.email],
        }}
      />
    </>
  );
}

export default ClientHeader;
