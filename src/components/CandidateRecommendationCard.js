import Capsule from "@/components/Capsule";
import DashboardSection from "@/components/DashboardSection";
import EntityCard from "@/components/EntityCard";
import Heading from "@/components/Heading";
import Skill from "@/components/Skill";
import { formatCurrencyNoDecimals } from "@/utils/utility";
import ButtonCapsule from "./ButtonCapsule";
import IconWithBg from "./IconWithBg";

const skills = ["python", "javascript", "react"];

function CandidateRecommendationCard({ client = {}, handleOpenOverlay }) {
  return (
    <DashboardSection
      paragraph={`Hey ${client.name}, here's your new`}
      heading="Job Recommendation"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <EntityCard
            entity={{
              image: "/avatars/avatar-1.png",
              name: 'Front-end Developer',
              profession: client.name,
            }}
          />
          <div className="capsules inline-flex items-center justify-center gap-[6px]">
            <Capsule>
              <p>exp: {client.name.length}Y </p>
            </Capsule>
            <Capsule>
              <p>full time</p>
            </Capsule>
            <Capsule icon={<IconWithBg icon="$" />}>
              <p className="">{formatCurrencyNoDecimals(2000)}</p>
            </Capsule>
          </div>
        </div>
        <Heading xm> Description </Heading>
        <p className="text-[#A3A3A3]">Are you a coding ninja with a passion for creating stunning user interfaces? Do you dream in HTML, CSS, and JavaScript, effortlessly transforming concepts into sleek, responsive designs? If so, we're looking for someone like you to join our team of tech wizards, where your skills will help shape innovative digital experiences that captivate users and set new standards in web development.</p>
        <div className="cto flex items-center justify-between">
          <div className="flex items-center justify-start gap-1">
            {skills.map((skill) => (
              <Skill key={skill} skill={skill} />
            ))}
            <span className="h-[1px] w-2 rounded-full bg-grey-primary-tint-40"></span>
          </div>
          <ButtonCapsule handleOpenOverlay={handleOpenOverlay}>
            Interested
          </ButtonCapsule>
        </div>
      </div>
    </DashboardSection>
  );
}

export default CandidateRecommendationCard;
