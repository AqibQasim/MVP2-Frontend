import React from "react";
import Capsule from "./Capsule";
import Skill from "./Skill";

function normalizeDescription(description) {
  if (!description) return [];
  return Array.isArray(description) ? description : [description];
}

function Project({ ...props }) {
  console.log(props);
  const descriptionList = normalizeDescription(props?.description);

  return (
    <Capsule className="w-full h-auto flex !justify-start !py-10 !px-10">
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between">
          <div className="gap-x-5 flex text-black">
            <div>{props.project_name}</div>
          </div>
          <div className="flex gap-x-5">{/* Dates or something, if available */}</div>
        </div>

        {props?.project_link && (
          <div className="pt-2 text-left">
            <a
              href={props.project_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-tint-10 text-sm underline break-all "
            >
              {props.project_link}
            </a>
          </div>
        )}

        <div className="flex !items-start flex-col gap-y-2 pt-5">
          Description:
          {descriptionList.map((desc, index) => (
            <div key={index?.toString()} className="!text-xs font-normal">
              {desc}
            </div>
          ))}
        </div>

        <div className="flex !items-start flex-col flex-wrap gap-y-2 pt-5">
          Industries:
          <div className="flex flex-wrap gap-x-5">
            {props?.industries?.map((industry, index) => (
              <Capsule key={index?.toString()} className="!text-xs font-normal border flex flex-wrap">
                {industry}
              </Capsule>
            ))}
          </div>
        </div>

        <div className="flex !items-start flex-col flex-wrap gap-y-2 pt-5">
          Skills:
          <div className="flex flex-wrap gap-x-5">
            {props?.skills?.map((skill, index) => (
              <Skill key={index?.toString()} className="!text-xs font-normal border flex flex-wrap" skill={skill} hideIcon={true} />
            ))}
          </div>
        </div>
      </div>
    </Capsule>
  );
}

export default Project;

