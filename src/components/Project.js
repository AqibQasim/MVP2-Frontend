import React from "react";
import Capsule from "./Capsule";

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
        <div className="w-full flex flex-wrap justify-between gap-4">
          <div className="text-lg font-semibold text-black">{props?.project_name}</div>
          {props?.project_link && (
            <a
              href={props.project_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-tint-10 text-sm underline break-all"
            >
              {props.project_link}
            </a>
          )}
        </div>

        {descriptionList.length > 0 && (
          <div className="flex flex-col gap-y-2 pt-5 text-sm text-grey-primary-shade-30 text-left">
            {descriptionList.map((paragraph, index) => (
              <p key={index?.toString()}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </Capsule>
  );
}

export default Project;

