import React from "react";
import Heading from "./Heading";
import Image from "next/image";
import ButtonCapsule from "./ButtonCapsule";

function CandidateEvaluateYourselfCard() {
  return (
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
            <button className="flex flex-row items-center justify-between gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold capitalize text-neutral-white">
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
  );
}

export default CandidateEvaluateYourselfCard;
