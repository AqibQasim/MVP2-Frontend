"use client";
import Capsule from "@/components/Capsule";
import EntityCard from "@/components/EntityCard";
import Heading from "@/components/Heading";
import Hr from "@/components/Hr";
import Skill from "@/components/Skill";
import TagCard from "@/components/TagCard";
import TalentDescription from "@/components/TalentDescription";
import Image from "next/image";
import { useState } from "react";
import briefcase_tick from "../../../../../../public/icons/briefcase-tick.svg";
import calendar from "../../../../../../public/icons/calendar.svg";
import clipboard_text from "../../../../../../public/icons/clipboard-text.svg";
import commitment from "../../../../../../public/icons/commitment.svg";
import copy_success from "../../../../../../public/icons/copy-success.svg";
import dropdown from "../../../../../../public/icons/drop-down.svg";
import note_add from "../../../../../../public/icons/note-add.svg";
import tag from "../../../../../../public/icons/tag-user.svg";
import timer_start from "../../../../../../public/icons/timer-start.svg";
import ButtonCapsuleWhite from "@/components/ButtonCapsuleWhite";

const client = {
  title: "Software Engineer",
  description: `Are you a coding ninja with a passion for creating stunning user interfaces? 
    Do you dream in HTML, CSS, and JavaScript, effortlessly transforming concepts into sleek, 
    responsive designs? If so, we're looking for someone like you to join our team of tech wizards, 
    where your skills will help shape innovative digital experiences that 
    captivate users and set new standards in web development.`,
  specialization: "Software Engineer",
  commitment: "Full-time (40 hrs/wk)",
  job_type: "Remote",
  workday_overlap: "6 hrs (5 hrs required)",
  estimated_length: "2 weeks",
  job_posted: "1 month ago",
  desired_start_date: "Aug 24, 2024",
  time_zone: "Karachi, 9 hrs behind",
};

const job_questions = [
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters?",
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters?",
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

function TalentViewById({ job_id }) {
  const [isShowMoreEnabled, setIsShowMoreEnabled] = useState(false);
  const [isReadMoreEnabled, setIsReadMoreEnabled] = useState(false);

  const handleShowMore = () => {
    setIsShowMoreEnabled((value) => setIsShowMoreEnabled(!value));
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="rounded-3xl bg-white p-4">
        <div className="w-auto">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-3">
              <ButtonCapsuleWhite/>
              <Heading sm>{client.title}</Heading>
            </div>
          </div>
          <Hr />
          <TalentDescription
            description={client.description}
            isShowMoreEnabled={isShowMoreEnabled}
            skills={['JavaScript','React']}
          />
          {client.description.length > 300 && (
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
                  answer={client.estimated_length}
                />

                <TagCard
                  icon={clipboard_text}
                  title={"Job Posted"}
                  answer={client.job_posted}
                />

                <TagCard
                  icon={briefcase_tick}
                  title={"Job Type"}
                  answer={client.job_type}
                />

                <TagCard
                  icon={copy_success}
                  title={"Workday Overlap"}
                  answer={client.workday_overlap}
                />
              </div>

              <div className="h-auto">
                <TagCard
                  icon={tag}
                  title={"Specialization"}
                  answer={client.specialization}
                />

                <TagCard
                  icon={commitment}
                  title={"Commitment"}
                  answer={client.commitment}
                />

                <TagCard
                  icon={calendar}
                  title={"Desired Start Date"}
                  answer={client.desired_start_date}
                />

                <TagCard
                  icon={timer_start}
                  title={"Time zone"}
                  answer={client.time_zone}
                />
              </div>
            </div>
          </div>

          <Hr />

          <div className="my-3">
            <Heading sm>Application Questions</Heading>
          </div>

          {job_questions.map((question, index) => (
            <div
              key={index}
              className="flex flex-row gap-1"
              style={{ color: "#A3A3A3" }}
            >
              <div className="w-4">
                <div>{index + 1}. </div>
              </div>
              <div className="w-auto">{question}</div>
            </div>
          ))}

          {job_questions.length > 1 && (
            <div className="flex flex-row gap-1">
              <button
                className="weigh flex w-36 flex-row items-center justify-around rounded-3xl px-4 py-3 text-[14px] font-semibold text-grey-primary-shade-60"
                onClick={handleShowMore}
              >
                {isReadMoreEnabled ? "Read More" : "Read Less"}
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
              {/* <Capsule
                  className="mr-auto h-8 w-max rounded-[40px] !bg-primary-tint-100"
                  icon={
                    <IconWithBg
                      icon={<SvgIconJobStatus status={job.job_status} />}
                    />
                  }
                >
                  {" "}
                  {job.job_status}{" "}
                </Capsule> */}
            </div>
            <div className="skills flex items-center gap-1.5 text-center">
              {job.skills.map((skill, i = numOfJobQues) => (
                <Skill key={i} skill={skill} />
              ))}
            </div>

            {/* <div className="flex flex-row mt-1 gap-2 text-center">
                <Capsule className="h-8 w-max rounded-[40px] !bg-primary-tint-100">
                  {" "}
                  {job.job_type}{" "}
                </Capsule>
                <Capsule className="h-8 w-max rounded-[40px] !bg-primary-tint-100">
                  {" "}
                  {"Exp: " + job.experience}{" "}
                </Capsule>
              </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TalentViewById;
