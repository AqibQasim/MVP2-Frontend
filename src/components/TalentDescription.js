"use client";
import { useState } from "react";
import Heading from "./Heading";

function TalentDescription({ description }) {
  const [showmore, setShowmore] = useState(false);
  return (
    <>
      <div className="justify-between rounded-xl bg-grey-primary-tint-90 px-4 py-4.5">
        <Heading className="py-3 font-lufga !text-[#8992A3]" sm>
          Description
        </Heading>
        <p className="text-sm text-grey-primary-shade-30">
          {description.length >= 300 && !showmore
            ? description.slice(0, 300) + "..."
            : description}
        </p>
      </div>
    </>
  );
}

export default TalentDescription;
