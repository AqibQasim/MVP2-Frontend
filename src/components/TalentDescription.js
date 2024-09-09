"use client";
import { useState } from "react";
import Heading from "./Heading";
import Skill from "./Skill";

function TalentDescription({ description, skills }) {
  console.log("Skills: ", skills);
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
        {skills && (
          <>
            <Heading className="py-3 !text-[#8992A3]" sm>
              Top Skills
            </Heading>
            <div className="flex items-start">
              {skills.map((skill, i) => (
                <Skill key={i} skill={skill} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default TalentDescription;
