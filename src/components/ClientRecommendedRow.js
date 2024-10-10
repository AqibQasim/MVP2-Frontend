import SvgIconJobStatus from "@/svgs/SvgIconJobStatus";
import Capsule from "./Capsule";
import EntityCard from "./EntityCard";
import IconWithBg from "./IconWithBg";
import SkillIconWithBg from "./SkillIconWithBg";
import Table from "./Table";
import SvgIconRequestInterview from "@/svgs/SvgIconRequestInterview";
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import { useState, useEffect, useRef } from "react";

function ClientRecommendedRow({ recommended }) {
  const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
  console.log(recommended);
  const { customer: candidate, job_postings: job } = recommended;

  useEffect(() => {
    setIsMounted(true);
    console.log("mounted");
  }, []);
  if (!isMounted) return null;

  return (
    <>
    <Table.Row>
      <EntityCard
        entity={{
          name: candidate?.name,
          profession: candidate?.specialization,
          image: "/avatars/avatar-1.png",
        }}
      />
      <div className="skills flex items-center justify-center gap-1.5 text-center">
        {job.skills.map((skill, i) => (
          <>
          <SkillIconWithBg key={i} icon={skill} skill={skill}/>
          
          </>
        ))}
      </div>
      <div className="job-title text-center">{job.position}</div>
      <div className="experience text-center">{candidate.experience}</div>
      <Capsule>{candidate.commitment}</Capsule>
      <Capsule
      onClick={() => setIsOpen(true)}
        className="ml-auto !bg-primary-tint-100"
        icon={<IconWithBg icon={<SvgIconRequestInterview />} />}
      >
        Request Interview
      </Capsule>
    </Table.Row>

     <PopupModal
      url='https://calendly.com/muhammad44aqib/30min'
      rootElement={document.getElementById('scheduleCallBtn')}
      text="Schedule Call"
      textColor="#fff"
      color="#000"
      height="200px"
      overflow="hidden"
      onModalClose={() => setIsOpen(false)}
      open={isOpen}
      // styles={{
      //   height: '10px'
      // }}
      prefill={{
        guests:[`${candidate.email}`]
    }}
              />
              </>
    
  );
}

export default ClientRecommendedRow;
