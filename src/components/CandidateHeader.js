"use client";
import SvgIconNotification from "@/svgs/SvgIconNotification";
import { formatDate } from "@/utils/utility";
import ButtonCapsule from "./ButtonCapsule";
import ButtonRounded from "./ButtonRounded";
import EntityCard from "./EntityCard";
import AvailabilityDropdown from "@/components/AvailabilityDropdown";
import { useState } from "react";

function CandidateHeader() {
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
          name: "Richard Feynman",
          profession: "Richardfeynman@gmail.com",
        }}
      />

      <div className="info ml-auto flex gap-3">
        <div className="ml-auto">
          <AvailabilityDropdown
            options={options}
            placeholder="Available"
            value={selectedValue}
            onChange={handleChange}
            className="text-sm font-bold"
          />
        </div>
        <div>
          <div className="buttons flex items-start justify-end gap-2">
            <EntityCard
              sm
              entity={{
                image: "/avatars/avatar-3.svg",
                name: "Esther Howard",
                profession: "Account Executive - AE",
              }}
            />
            <ButtonRounded>
              <SvgIconNotification />
            </ButtonRounded>
          </div>

          <div className="joing-date float-right">
            <p className="capitalize text-grey-primary-shade-10">
              Joined date:{" "}
              <span className="font-semibold">
                {" "}
                {formatDate(new Date("2024-04-27"))}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateHeader;
