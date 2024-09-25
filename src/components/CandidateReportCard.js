import React, { useCallback, useEffect, useState } from "react";
import Heading from "./Heading";
import Hr from "./Hr";
import EntityCard from "./EntityCard";
import Capsule from "./Capsule";
import IconWithBg from "./IconWithBg";
import Skill from "./Skill";
import { formatCurrencyNoDecimals } from "@/utils/utility";
import ButtonCapsule from "./ButtonCapsule";

function CandidateReportCard({ candidateReport }) {
  const [score, setScore] = useState(0);
  const [recommendationStatus, setRecommendationStatus]= useState(null)
  const calculateScore = () => {
    const result = candidateReport?.result;
    const score = (
      (result?.softskillRating + result?.technicalRating) /
      2
    );
    setScore(score);

    if(score>=7){
        setRecommendationStatus("Recommended")
    }else if(score>=5){
        setRecommendationStatus("Qualified")
    }else{
        setRecommendationStatus("Not Qualified")
    }
  };

  useEffect(()=>{
    calculateScore();
  },[candidateReport])

  return (
    <div className="h-full w-full gap-8 rounded-4xl bg-neutral-white px-8 py-10">
      <div>
        <Heading sm>Reports</Heading>
        <Hr />
      </div>

      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <EntityCard
            entity={{
              image: "/avatars/avatar-1.png",
              name: candidateReport?.customer?.name,
              profession: candidateReport?.customer?.specialization,
            }}
          />
          <div className="capsules inline-flex items-center justify-center gap-[6px]">
            <Capsule>
              <p> {candidateReport?.customer?.experience} </p>
            </Capsule>
            <Capsule>
              <p> {candidateReport?.customer?.job_type} </p>
            </Capsule>
            <Capsule icon={<IconWithBg icon="$" />}>
              <p className="">{formatCurrencyNoDecimals(2000)}</p>
            </Capsule>
          </div>
        </div>
        {/* <Heading xm> {candidateReport?.customer?.position} </Heading> */}
        <div className="cto flex items-center justify-between">
          <div className="flex items-center justify-start gap-1">
            {candidateReport?.customer?.expertise?.map((skill) => (
              <Skill
                key={skill?.skill}
                icon={skill?.skill}
                skill={skill?.skill}
              />
            ))}
            <span className="h-[1px] w-2 rounded-full bg-grey-primary-tint-40"></span>
            <Skill score={score} />
          </div>
          <ButtonCapsule>{recommendationStatus}</ButtonCapsule>
          {/* ScheduleInterview */}
          {/* <ScheduleInterviewModal /> */}
        </div>
      </div>
    </div>
  );
}

export default CandidateReportCard;
