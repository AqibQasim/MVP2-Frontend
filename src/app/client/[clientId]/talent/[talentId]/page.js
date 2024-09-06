import ActionButtons from "@/components/ActionButtons";
import ButtonCapsule from "@/components/ButtonCapsule";
import ButtonCapsuleWhite from "@/components/ButtonCapsuleWhite";
import ButtonRounded from "@/components/ButtonRounded";
import Heading from "@/components/Heading";
import Hr from "@/components/Hr";
import TagCard from "@/components/TagCard";
import tag from "../../../../../../public/icons/tag-user.svg";
import commitment from "../../../../../../public/icons/commitment.svg";
import note_add from "../../../../../../public/icons/note-add.svg";
import clipboard_text from "../../../../../../public/icons/clipboard-text.svg";
import briefcase_tick from "../../../../../../public/icons/briefcase-tick.svg";
import calendar from "../../../../../../public/icons/calendar.svg";
import copy_success from "../../../../../../public/icons/copy-success.svg";
import timer_start from "../../../../../../public/icons/timer-start.svg";
import React from "react";
import EntityCard from "@/components/EntityCard";
import Capsule from "@/components/Capsule";
import IconWithBg from "@/components/IconWithBg";
import SvgIconJobStatus from "@/svgs/SvgIconJobStatus";
import Skill from "@/components/Skill";

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
  {
    job_status: "hired",
    profession: "Software Developer",
    candidate_name: "R. Feynman",
    skills: ["Python", "JavaScript", "React"],
    job_type: "Full-Time",
    experience: "2Y",
  },
];

function TalentViewById({ talentId }) {
  return (
    <div className="flex flex-row gap-2">
      <div className="rounded-3xl bg-white p-4">
        <div className="w-auto">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-3">
              <ButtonCapsuleWhite />
              <Heading className="text-[24px]">{client.title}</Heading>
            </div>
            <ButtonCapsule>Next</ButtonCapsule>
          </div>
          <Hr />

          {/* <div className="my-3">
            <Heading>{client.title}</Heading>
          </div> */}

          <div className="justify-between rounded-xl bg-grey-primary-tint-90 px-4 py-4.5 font-lufga">
            <Heading
              style={{ color: "#8992A3" }}
              className="py-3 font-lufga"
              sm
            >
              Description
            </Heading>

            <div style={{ color: "#A3A3A3" }} className="font-lufga text-sm">
              {client.description}
            </div>
          </div>

          <div className="w-full gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TagCard
                icon={tag}
                title={"Specialization"}
                answer={client.specialization}
              />
              <TagCard
                icon={note_add}
                title={"Est. Length"}
                answer={client.estimated_length}
              />
              <TagCard
                icon={commitment}
                title={"Commitment"}
                answer={client.commitment}
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
                icon={calendar}
                title={"Desired Start Date"}
                answer={client.desired_start_date}
              />
              <TagCard
                icon={copy_success}
                title={"Workday Overlap"}
                answer={client.workday_overlap}
              />
              <TagCard
                icon={timer_start}
                title={"Time zone"}
                answer={client.time_zone}
              />
            </div>
          </div>

          <Hr />

          <div className="my-3">
            <Heading sm>Application Questions</Heading>
          </div>

          {job_questions.map((question, index) => (
            <div className="flex flex-row gap-1" style={{ color: "#A3A3A3" }}>
              <div className="w-4">
                <div>{index + 1}. </div>
              </div>
              <div className="w-auto">{question}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="items-center justify-center rounded-[36px] bg-white p-3">
        <div className="flex h-auto w-auto flex-row justify-between items-center">
          <Heading className="text-[24px]">Status</Heading>
          <Capsule className="items-center text-primary-tint-20">
            Interview in progress
          </Capsule>
        </div>
        <Hr />
        {job_on_progress.map((job) => (
          <div className="mb-3 w-full gap-3 rounded-xl">
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
              {job.skills.map((skill, i) => (
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
