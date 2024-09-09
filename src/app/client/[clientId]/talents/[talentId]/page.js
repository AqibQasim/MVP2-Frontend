import ButtonBack from "@/components/ButtonBack";
import Capsule from "@/components/Capsule";
import EntityCard from "@/components/EntityCard";
import Heading from "@/components/Heading";
import Hr from "@/components/Hr";
import IconWithBg from "@/components/IconWithBg";
import TalentDescription from "@/components/TalentDescription";

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
    </div>
  );
}

export default TalentIdPage;
