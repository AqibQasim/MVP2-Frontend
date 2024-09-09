import React from "react";
import Heading from "./Heading";
import Skill from "./Skill";

function TalentDescription({ description, isShowMoreEnabled, skills }) {
  return (
    <div className="justify-between rounded-xl bg-grey-primary-tint-90 px-4 py-4.5">
      <Heading style={{ color: "#8992A3" }} className="py-3 font-lufga" sm>
        Description
      </Heading>

      <div className="text-sm text-grey-primary-shade-30">
        {description.length >= 300 && !isShowMoreEnabled
          ? description.slice(0, 300) + "..."
          : description}
      </div>
      {skills && (
        <div className="flex justify-start flex-col">
          <Heading style={{ color: "#8992A3" }} className="py-3 font-lufga " sm>
            Top Skills
          </Heading>
          <div className="flex items-start">
            {skills.map((skill, i = numOfJobQues) => (
              <Skill key={i} skill={skill} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TalentDescription;
