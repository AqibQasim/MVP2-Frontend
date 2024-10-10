"use client";
import briefcase_tick from "@/../public/icons/briefcase-tick.svg";
import calendar from "@/../public/icons/calendar.svg";
import clipboard_text from "@/../public/icons/clipboard-text.svg";
import commitment from "@/../public/icons/commitment.svg";
import copy_success from "@/../public/icons/copy-success.svg";
import dropdown from "@/../public/icons/drop-down.svg";
import note_add from "@/../public/icons/note-add.svg";
import tag from "@/../public/icons/tag-user.svg";
import timer_start from "@/../public/icons/timer-start.svg";
import ButtonCapsuleWhite from "@/components/ButtonCapsuleWhite";
import Capsule from "@/components/Capsule";
import EntityCard from "@/components/EntityCard";
import Heading from "@/components/Heading";
import Hr from "@/components/Hr";
import Skill from "@/components/Skill";
import TagCard from "@/components/TagCard";
import TalentDescription from "@/components/TalentDescription";
import { cityTimezoneOffset } from "@/utils/cityTimezoneOffset";
import { formatDate } from "@/utils/utility";
import Image from "next/image";
import { useCallback, useState } from "react";

const job_questions = [
  "It is a long established fact that a reader will be distracted by the readable content of a Page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters?",
  "It is a long established fact that a reader will be distracted by the readable content of a Page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters?",
];

const job_on_progress = [
  {
    job_status: "open",
    profession: "Software Developer",
    candidate_name: "R. Feynman",
    skills: ["Python", "JavaScript", "React"],
    job_type: "Full-Time",
    experience: "2Y",
  },
];

function JobViewById({ job }) {
  const [isShowMoreEnabled, setIsShowMoreEnabled] = useState(false);
  const [isReadMoreEnabled, setIsReadMoreEnabled] = useState(false);
  const [jobQuestionLength, setJobQuestionLength] = useState(1);

  const handleShowMore = () => {
    setIsShowMoreEnabled((value) => !value);
  };

  const handleReadMore = () => {
    setIsReadMoreEnabled((value) => !value);
    if (isReadMoreEnabled) {
      setJobQuestionLength(job.application_questions.length);
    } else {
      setJobQuestionLength(1);
    }
  };

  const createApplicationQuestions = useCallback(
    ({ job_questions, length }) => {
      const questions = [];

      for (let i = 0; i < length; i++) {
        console.log(i);
        questions.push(
          <div
            key={i}
            className="flex flex-row gap-1"
            style={{ color: "#A3A3A3" }}
          >
            <div className="w-4">
              <div>{i + 1}. </div>
            </div>
            <div className="w-auto">{job_questions[i]}</div>
          </div>,
        );
      }

      return questions;
    },
    [jobQuestionLength],
  );

  return (
    <div className="flex flex-row gap-2">
      <div className="flex-1 rounded-3xl bg-white p-4">
        <div className="w-auto">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-3">
              <ButtonCapsuleWhite />
              <Heading sm>{job.position}</Heading>
            </div>
          </div>
          <Hr />
          <TalentDescription
            description={job.description}
            isShowMoreEnabled={isShowMoreEnabled}
            skills={job.skills}
          />
          {job.description.length > 300 && (
            <div className="m-3">
              <button
                className="weigh flex w-36 flex-row items-center justify-around rounded-3xl border-[1px] px-4 py-3 text-[14px] text-primary"
                onClick={handleShowMore}
              >
                {isShowMoreEnabled ? "Show Less" : "Show More"}
                <Image alt="dropdown" src={dropdown} />
              </button>
            </div>
          )}

          <div className="gap-8">
            <div className="flex flex-row flex-wrap">
              <div className="h-auto">
                <TagCard
                  icon={note_add}
                  title={"Est. Length"}
                  answer={job.project_length}
                />

                <TagCard
                  icon={clipboard_text}
                  title={"Job Posted"}
                  answer={formatDate(job.createdAt)}
                />

                <TagCard
                  icon={briefcase_tick}
                  title={"Job Type"}
                  answer={job.job_type}
                />

                <TagCard
                  icon={copy_success}
                  title={"Workday Overlap"}
                  answer={job.workday_overlap}
                />
              </div>

              <div className="h-auto">
                <TagCard
                  icon={tag}
                  title={"Specialization"}
                  answer={"[job specialization]"}
                />

                <TagCard
                  icon={commitment}
                  title={"Commitment"}
                  answer={job.commitment}
                />

                <TagCard
                  icon={calendar}
                  title={"Desired Start Date"}
                  answer={formatDate(job.start_date)}
                />

                <TagCard
                  icon={timer_start}
                  title={"Time zone"}
                  answer={cityTimezoneOffset(job.location)}
                />
              </div>
            </div>
          </div>

          <Hr />

          <div className="my-3">
            <Heading sm>Application Questions</Heading>
          </div>

          {createApplicationQuestions({
            job_questions: job?.application_questions,
            length: job?.application_questions?.length,
          }).map((q) => q)}

          {job?.application_questions?.length > 1 && (
            <div className="flex flex-row gap-1">
              <button
                className="weigh flex w-36 flex-row items-center justify-around rounded-3xl px-4 py-3 text-[14px] font-semibold text-grey-primary-shade-60"
                onClick={handleReadMore}
              >
                <p>{isReadMoreEnabled ? "Read More" : "Read Less"}</p>
                <Image alt="dropdown" src={dropdown} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-[23.375rem] items-center justify-center rounded-[36px] bg-white p-3">
        <div className="flex h-auto w-auto flex-row items-center justify-between">
          <Heading className="text-[24px]">Status</Heading>
          <Capsule className="items-center text-primary-tint-20">
            Interview in progress
          </Capsule>
        </div>
        <Hr />
        {job_on_progress.map((job, index) => (
          <div key={index} className="mb-3 w-full gap-3 rounded-xl">
            <div className="flex flex-1 flex-row items-center justify-between border-[1px] border-[#F9F8FC]">
              <EntityCard
                entity={{
                  name: job.candidate_name,
                  profession: job.profession,
                  image: "/avatars/avatar-1.png",
                }}
              />
            </div>
            <div className="skills flex items-center gap-1.5 text-center">
              {job.skills.map((skill, i) => (
                <>
                <Skill key={i} skill={skill} />
                {skill}
                </>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobViewById;
