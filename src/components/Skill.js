import { formatWithDecimalZero } from "@/utils/utility";
import Image from "next/image";
import PropTypes from "prop-types";

function Skill({ className, icon, skill, score = null, experience = null, hideIcon = false }) {
  const skillObj =
    typeof skill === "object" && skill !== null ? skill : undefined;
  const skillLabel =
    typeof skill === "string"
      ? skill
      : skillObj?.skill || skillObj?.name || skillObj?.title || "";
  const iconKey = icon || skillObj?.icon || skillLabel || skill;
  const resolvedExperience =
    experience ??
    skillObj?.experience ??
    skillObj?.years ??
    skillObj?.years_of_experience ??
    skillObj?.yearsExperience ??
    skillObj?.year;
  const experienceLabel =
    resolvedExperience === null || resolvedExperience === undefined
      ? null
      : typeof resolvedExperience === "number"
        ? `${resolvedExperience} year${
            resolvedExperience === 1 ? "" : "s"
          }`
        : resolvedExperience;

  return (
    <div
      className={`${className} flex items-center justify-center gap-1.5 rounded-[2.25rem] bg-grey-primary-tint-90 p-2.5 pr-3 font-lufga text-sm !font-normal text-black`}
    >
      {skillLabel || iconKey ? (
        <>
          {!hideIcon && (
            <Image
              className="size-5"
              src={
                iconKey
                  ? iconKey.startsWith("/")
                    ? iconKey
                    : `/skills/${iconKey}.svg`
                  : "/icons/singularity.svg"
              }
              height={20}
              width={20}
              alt={`${skillLabel || iconKey} icon`}
              onError={(e) => {
                e.target.src = "/icons/singularity.svg";
              }}
            />
          )}
          <span className="capitalize">{skillLabel || iconKey}</span>
          {experienceLabel && (
            <span className="text-grey-primary-shade-40">
              {" "}
              - {experienceLabel}
            </span>
          )}
        </>
      ) : (
        <>
          Score:
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
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  skill: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      skill: PropTypes.string,
      name: PropTypes.string,
      experience: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ]),
  score: PropTypes.number,
  experience: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideIcon: PropTypes.bool,
};

export default Skill;