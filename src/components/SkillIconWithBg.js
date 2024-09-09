import { formatWithDecimalZero } from "@/utils/utility";
import Image from "next/image";
import PropTypes from "prop-types";

function SkillIconWithBg({ icon, skill = null, score = null, className }) {
  return (
    <div
      className={`${className} flex items-center justify-start gap-1.5 rounded-[2.25rem] bg-grey-primary-tint-90 p-2.5 pr-3 font-lufga text-sm !font-normal capitalize text-black`}
    >
      {icon ? (
        <>
          <div className="relative !size-5">
            <Image
              className="object-cover"
              src={`/tech-icons/${icon}.svg`}
              alt={`${icon} icon`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placehoder="blur"
            />
          </div>
          {skill && skill}
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

SkillIconWithBg.propTypes = {
  icon: PropTypes.string,
  skill: PropTypes.string,
  score: PropTypes.number,
  className: PropTypes.string,
};

export default SkillIconWithBg;
