"use client";
import { useState } from "react";
import Heading from "./Heading";
import Skill from "./Skill";

function TalentDescription({ description, skills }) {
  console.log("Skills: ", skills);
  const [showmore, setShowmore] = useState(false);
  return (
    <>
      <div className="justify-between space-y-4 rounded-xl bg-grey-primary-tint-90 px-4 py-4.5">
        <Heading className="font-semibold !text-[#8992A3]" toxm>
          Description
        </Heading>
        <p className="text-sm text-grey-primary-shade-30">
          {description.length >= 300 && !showmore
            ? description.slice(0, 300) + "..."
            : description}
        </p>
        {skills && (
          <>
            <Heading className="font-semibold !text-[#8992A3]" toxm>
              Top Skills
            </Heading>
            <div className="flex items-start gap-1.5">
              {skills.map((skill, i) => (
                <>
                <Skill key={i} skill={skill} className="!bg-neutral-white" />
                  
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default TalentDescription;
