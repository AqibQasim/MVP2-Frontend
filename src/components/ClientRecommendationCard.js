import Capsule from "@/components/Capsule";
import DashboardSection from "@/components/DashboardSection";
import EntityCard from "@/components/EntityCard";
import Heading from "@/components/Heading";
import Skill from "@/components/Skill";
import { formatCurrencyNoDecimals } from "@/utils/utility";
import ButtonCapsule from "./ButtonCapsule";
import IconWithBg from "./IconWithBg";

const skills = ["python", "javascript", "react"];

function ClientRecommendationCard({ client = {}, handleOpenOverlay }) {
  return (
    <DashboardSection
      paragraph={`Hey ${client.name}, here's your new`}
      heading="Recommendations"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <EntityCard
            entity={{
              image: "/avatars/avatar-1.png",
              name: client.name,
              profession: client.website,
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
        <Heading xm> {client.username} </Heading>
        <div className="cto flex items-center justify-between">
          <div className="flex items-center justify-start gap-1">
            {skills.map((skill) => (
              <Skill key={skill} skill={skill} />
            ))}
            <span className="h-[1px] w-2 rounded-full bg-grey-primary-tint-40"></span>
            <Skill score={8.0} />
          </div>
          <ButtonCapsule handleOpenOverlay={handleOpenOverlay}>
            Schedule Interview
          </ButtonCapsule>
        </div>
      </div>
    </DashboardSection>
  );
}

export default ClientRecommendationCard;
