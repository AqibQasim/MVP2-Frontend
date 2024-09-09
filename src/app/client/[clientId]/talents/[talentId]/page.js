import ButtonBack from "@/components/ButtonBack";
import Capsule from "@/components/Capsule";
import DetailTag from "@/components/DetailTag";
import EntityCard from "@/components/EntityCard";
import Heading from "@/components/Heading";
import Hr from "@/components/Hr";
import IconWithBg from "@/components/IconWithBg";
import TalentDescription from "@/components/TalentDescription";

const talentDetails = [
  {
    icon: "/icons/note-add.svg",
    name: "Est. length",
    content: "2 weeks",
  },
  {
    icon: "/icons/tag-user.svg",
    name: "Specialization",
    content: "Software Engineer",
  },
  {
    icon: "/icons/copy-success.svg",
    name: "Workday overlap",
    content: "6 hrs (5 hrs required",
  },
  {
    icon: "/icons/clipboard-text.svg",
    name: "Job posted",
    content: "1 month ago",
  },
  {
    icon: "/icons/commitment.svg",
    name: "Commitment",
    content: "Full-time (40 hrs/wk)",
  },
  {
    icon: "/icons/timer-start.svg",
    name: "Time zone",
    content: "Karachi, 9 hrs behind",
  },
  {
    icon: "/icons/briefcase-tick.svg",
    name: "Job type",
    content: "remote",
  },
  {
    icon: "/icons/calendar.svg",
    name: "Desired start date",
    content: "Aug 24, 2024",
  },
];

function TalentIdPage() {
  return (
    <div className="min-h-full space-y-4 rounded-3xl bg-neutral-white p-6">
      <div className="top flex items-center justify-start gap-3">
        <ButtonBack />
        <Heading sm>Profile Overview</Heading>
        <Capsule className="ml-auto !bg-grey-primary-tint-90 !text-primary-tint-10">
          Trial - 1st April - 14 April
        </Capsule>
      </div>
      <Hr />
      <div className="mini-profile flex items-center justify-start">
        <EntityCard
          entity={{
            image: "/avatars/avatar-1.png",
            name: "John Doe",
            profession: "Software Developer",
          }}
        />
        <Capsule className="ml-auto mt-auto" icon={<IconWithBg icon="$" />}>
          $20hr
        </Capsule>
      </div>
      <TalentDescription
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae velit numquam hic consectetur amet non sequi repellat? Porro, autem illo, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae velit numquam hic consectetur amet non sequi repellat? Porro, autem illo, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae velit numquam hic consectetur amet non sequi repellat? Porro, autem illo,Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae velit numquam hic consectetur amet non sequi repellat? Porro, autem illo,"
        skills={["javascript", "react", "python"]}
      />
      <div className="grid grid-cols-3 grid-rows-3 gap-x-8 gap-y-4.5">
        {talentDetails.map((detail) => (
          <DetailTag
            key={detail.name}
            icon={detail.icon}
            name={detail.name}
            content={detail.content}
          />
        ))}
      </div>
    </div>
  );
}

export default TalentIdPage;
