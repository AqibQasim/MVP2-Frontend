import React from "react";
import Heading from "./Heading";

function TalentDescription({ description, isShowMoreEnabled }) {
  return (
    <div className="justify-between rounded-xl bg-grey-primary-tint-90 px-4 py-4.5 font-lufga">
      <Heading style={{ color: "#8992A3" }} className="py-3 font-lufga" sm>
        Description
      </Heading>

      <div style={{ color: "#A3A3A3" }} className="font-lufga text-sm">
        {description.length >= 300 && !isShowMoreEnabled
          ? description.slice(0, 300) + "..."
          : description}
      </div>
    </div>
  );
}

export default TalentDescription;
