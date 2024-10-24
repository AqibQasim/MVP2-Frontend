"use client";
import AvailabilityDropdown from "@/components/AvailabilityDropdown";
import SvgIconNotification from "@/svgs/SvgIconNotification";
import { formatDate } from "@/utils/utility";
import { useState, useEffect, useRef } from "react";
import ButtonCapsule from "./ButtonCapsule";
import ButtonRounded from "./ButtonRounded";
import EntityCard from "./EntityCard";
import { PopupModal, useCalendlyEventListener } from "react-calendly";

function CandidateHeader({ candidate }) {
  // State to keep track of the selected value
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const [isCandidate, setIsCandidate] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Options for the dropdown
  const options = [{ value: "Un-Available", label: "Un-Available" }];

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-CA"); // Formats to YYYY-MM-DD
  };

  // Handle change event
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log("Selected value:", event.target.value);
  };

  useEffect(() => {
    setIsCandidate(true);
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
      <div className="flex" id="scheduleCallBtn">
        <EntityCard
          lg
          entity={{
            image: "/avatars/avatar-3.svg",
            name: candidate?.name,
            profession: candidate?.specialization,
          }}
        />
        <div className="info ml-auto space-y-4">
          <div className="buttons flex items-start justify-end gap-2">
            <AvailabilityDropdown
              options={options}
              placeholder="Available"
              value={selectedValue}
              onChange={handleChange}
              className="text-sm font-bold"
            />
            <EntityCard
              sm
              entity={{
                image: "/avatars/avatar-3.svg",
                name: "Esther Howard",
                profession: "Account Executive - AE",
              }}
            />

            {isCandidate && (
              <div>
                <ButtonCapsule
                  ref={buttonRef}
                  onPress={() => setIsOpen(true)}
                  // id="scheduleCallBtn"
                >
                  Schedule a Call
                </ButtonCapsule>
              </div>
            )}
            <ButtonRounded>
              <SvgIconNotification />
            </ButtonRounded>
          </div>
          <div className="join-date float-right">
            <p className="capitalize text-grey-primary-shade-10">
              Joined date:{" "}
              <span className="font-semibold">
                {formatDate(candidate?.createdAt)}
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
          name: candidate?.name,
          email: [candidate?.email],
        }}
      />
    </>
  );
}

export default CandidateHeader;
