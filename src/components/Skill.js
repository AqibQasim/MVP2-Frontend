import { formatWithDecimalZero } from "@/utils/utility";
import Image from "next/image";
import PropTypes from "prop-types";

function Skill({ skill, score = null }) {
  return (
    <div className="flex items-center justify-start gap-1.5 rounded-[2.25rem] bg-grey-primary-tint-90 p-2.5 pr-3 font-lufga text-sm !font-normal capitalize text-black">
      {skill ? (
        <>
          <Image
            className="size-5"
            src={`/tech-icons/${skill}.svg`}
            height={20}
            width={20}
            alt={`${skill} icon`}
          />
          {skill}
        </>
      ) : (
        <>
          Score:{" "}
          <span className="font-semibold">
            {" "}
            {formatWithDecimalZero(score)}{" "}
          </span>
          <Image
            className="size-5"
            src={`/recruitinn.png`}
            height={20}
            width={20}
            alt={`Recruitinn icon`}
          />
        </>
      )}
    </div>
  );
}

Skill.propTypes = {
  skill: PropTypes.string,
  score: PropTypes.number,
};

export default Skill;
