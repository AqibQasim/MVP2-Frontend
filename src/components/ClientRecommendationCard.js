import Capsule from "@/components/Capsule";
import DashboardSection from "@/components/DashboardSection";
import EntityCard from "@/components/EntityCard";
import Heading from "@/components/Heading";
import Skill from "@/components/Skill";
import { formatCurrency, formatCurrencyNoDecimals } from "@/utils/utility";
import IconWithBg from "./IconWithBg";
import ScheduleInterviewModal from "./ScheduleInterviewModal";

function ClientRecommendationCard({
  client = {},
  recommendedCandidate = {},
  recommendedForJob = {},
}) {
  return (
    <DashboardSection
      paragraph={`Hey ${client.name}, here's your new`}
      heading="Recommendations"
    >
      {!recommendedCandidate?.name ? (
        <p>No data to show</p>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <EntityCard
              entity={{
                image: "/avatars/avatar-1.png",
                name: recommendedCandidate.name,
                profession: recommendedCandidate.position,
              }}
            />
            <div className="capsules inline-flex items-center justify-center gap-[6px]">
              <Capsule>
                <p> {recommendedCandidate.experience} </p>
              </Capsule>
              <Capsule>
                <p> {recommendedForJob.job_type} </p>
              </Capsule>
              <Capsule icon={<IconWithBg icon="$" />}>
                <p className="">
                  {formatCurrency(recommendedCandidate.hourly_rate)}
                </p>
              </Capsule>
            </div>
          </div>
          <Heading xm> {recommendedForJob.position} </Heading>
          <div className="cto flex items-center justify-between">
            <div className="flex items-center justify-start gap-1">
              {recommendedForJob.skills?.map((skill) => (
                <Skill key={skill} icon={skill} skill={skill} />
              ))}
              <span className="h-[1px] w-2 rounded-full bg-grey-primary-tint-40"></span>
              <Skill score={8.0} />
            </div>
            {/* ScheduleInterview */}
            <ScheduleInterviewModal />
          </div>
        </div>
      )}
    </DashboardSection>
  );
}

export default ClientRecommendationCard;
