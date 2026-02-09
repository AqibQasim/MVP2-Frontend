import Capsule from "./Capsule";

const PROFICIENCY_LEVELS = {
  expert: "Expert",
  intermediate: "Strong", 
  beginner: "Competitive"
};

function SkillCategories({ categories = null, emptyMessage = "No skills added yet." }) {
  
  const skillsData = categories;
  
  if (!skillsData || skillsData.length === 0) {
    return (
      <Capsule className="w-full h-auto flex !justify-start !py-10 !px-10">
        <p className="text-grey-primary-shade-30">{emptyMessage}</p>
      </Capsule>
    );
  }

  return (
    <Capsule className="w-full h-auto flex !justify-start !py-8 !px-8">
      <div className="w-full">
        <div className="grid grid-cols-2 gap-x-16 gap-y-3">
          {skillsData.map((item, index) => {
            const proficiencyLabel = item?.level 
              ? PROFICIENCY_LEVELS[item.level.toLowerCase()] || "Competitive"
              : "Competitive";
            const isExpert = item.level?.toLowerCase() === "expert";

            return (
              <div 
                key={index}
                className="flex items-center justify-between py-2"
              >
                <Capsule className=" font-normal border flex items-center gap-2">
                  {isExpert && <span className="text-yellow-500">⭐</span>}
                  <span>{item.skill}</span>
                </Capsule>
                <Capsule className=" font-normal border">
                  {proficiencyLabel}
                </Capsule>
              </div>
            );
          })}
        </div>
      </div>
    </Capsule>
  );
}

export default SkillCategories;
