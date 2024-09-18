import React, { useState } from "react";
import Heading from "./Heading";
import Image from "next/image";
import ButtonCapsule from "./ButtonCapsule";
import Overlay from "./Overlay";
import AddSkillForm from "./AddSkillForm";

function CandidateEvaluateYourselfCard() {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");
  const [skill4, setSkill4] = useState("");
  const [codingSkill, setCodingSkill] = useState("");
  const [level1, setLevel1] = useState("");
  const [level2, setLevel2] = useState("");
  const [level3, setLevel3] = useState("");
  const [level4, setLevel4] = useState("");

  return (
    <>
      <div className="h-full w-full gap-8 rounded-4xl bg-neutral-white px-8 py-10">
        <Heading sm className="font-[500]" style={{ fontSize: "40px" }}>
          Here’s Where Your Journey Begins
        </Heading>

        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex h-auto w-auto flex-col items-center justify-center space-y-6">
            {/* Profile Image */}
            <div className="relative h-[140px] w-[140px] overflow-hidden rounded-full bg-bg-avatar">
              <Image
                src={"/avatars/avatar-4.svg"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                alt="Avatar image"
              />
            </div>

            {/* Welcome Message */}
            <div className="text-center">
              <Heading sm className="font-medium" style={{ fontSize: "34px" }}>
                Welcome, Richard Feynman
              </Heading>
              <p className="text-grey-primary-shade-30">
                Are you ready to tackle the AI Assessment to stand out amongst
                other candidates?
              </p>
            </div>

            {/* Evaluate Yourself Button */}
            <div>
              <button
                onClick={() => setOverlayVisible(true)}
                className="flex flex-row items-center justify-between gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold capitalize text-neutral-white"
              >
                Evaluate yourself
                <Image
                  width={23}
                  height={24.3}
                  src={"/evaluate-yourself.svg"}
                  alt="Evaluate yourself icon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOverlayVisible && (
        <Overlay width={"80%"} height={"83%"} isVisible={isOverlayVisible}>
          <AddSkillForm
            skill1={skill1}
            setSkill1={setSkill1}
            skill2={skill2}
            setSkill2={setSkill2}
            skill3={skill3}
            setSkill3={setSkill3}
            skill4={skill4}
            setSkill4={setSkill4}
            level1={level1}
            setLevel1={setLevel1}
            level2={level2}
            setLevel2={setLevel2}
            level3={level3}
            setLevel3={setLevel3}
            level4={level4}
            setLevel4={setLevel4}
            //   codingExpertise={codingExpertise}
            //   setCodingExpertise={setCodingExpertise}
            //   isTestRequired={isTestRequired}
            //   setIsTestRequired={setIsTestRequired}
            //   expertiseRef={expertiseRef}
            //   setTechStack={setTechStack}
          />
        </Overlay>
      )}
    </>
  );
}

export default CandidateEvaluateYourselfCard;
