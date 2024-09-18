import React from "react";
import Heading from "./Heading";
import Image from "next/image";
import ButtonCapsule from "./ButtonCapsule";

function CandidateEvaluateYourselfCard() {
  return (
    <div className="flex h-full w-full gap-8 rounded-4xl bg-neutral-white px-8 py-10">
      <div className="h-full w-full">
        <Heading sm className="font-[500]" style={{ fontSize: "40px" }}>
          Here’s Where Your Journey Begins
        </Heading>

        <div className="h-[324px] w-[815px] gap-8">
          <div
            className={`relative size-[140px] overflow-hidden rounded-full bg-bg-avatar`}
          >
            <Image
              src={"/avatars/avatar-4.svg"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              alt="Avatar image"
            />
          </div>

          
            <Heading sm className="font-[500]" style={{ fontSize: "34px" }}>
              Welcome, Richard Feynman
            </Heading>
            <p className="text-grey-primary-shade-30">
              Are you ready to tackle the AI Assessment to stand out amongst
              other candidates?
            </p>
          
          <button
            className={`flex flex-row items-center justify-between gap-2 rounded-[2.5rem] bg-primary px-5 py-2 text-sm font-bold capitalize text-neutral-white`}
          >
            Evaluate yourself
            <Image width={23} height={24.3} src={"/evaluate-yourself.svg"} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CandidateEvaluateYourselfCard;
