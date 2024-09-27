"use client";
import AvailabilityDropdown from "@/components/AvailabilityDropdown";
import SvgIconNotification from "@/svgs/SvgIconNotification";
import { formatDate } from "@/utils/utility";
import { useState } from "react";
import ButtonCapsule from "./ButtonCapsule";
import ButtonRounded from "./ButtonRounded";
import EntityCard from "./EntityCard";

function CandidateHeader({ candidate }) {
  // State to keep track of the selected value
  const [selectedValue, setSelectedValue] = useState("");

  // Options for the dropdown
  const options = [{ value: "Offline", label: "Offline" }];

  // Handle change event
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log("Selected value:", event.target.value);
  };

  return (
    <div className="flex">
      <EntityCard
        lg
        entity={{
          image: "/avatars/avatar-2.png",
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

          <ButtonCapsule
          // ref={buttonRef}
          // handleOpenOverlay={() => setIsOpen(true)}
          // id="scheduleCallBtn"
          >
            Schedule a Call
          </ButtonCapsule>

          <ButtonRounded>
            <SvgIconNotification />
          </ButtonRounded>
        </div>
        <div className="join-date float-right">
          <p className="capitalize text-grey-primary-shade-10">
            Joined date:{" "}
            <span className="font-semibold">
              {formatDate(new Date("2024-04-27"))}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CandidateHeader;
