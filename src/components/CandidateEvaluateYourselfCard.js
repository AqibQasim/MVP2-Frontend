import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import AddSkillForm from "./AddSkillForm";
import CandidateProfileInfo from "./CandidateProfileInfo";
import Heading from "./Heading";
import Overlay from "./Overlay";

function CandidateEvaluateYourselfCard({ candidate }) {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");
  const [skill4, setSkill4] = useState("");
  const [level1, setLevel1] = useState("");
  const [level2, setLevel2] = useState("");
  const [level3, setLevel3] = useState("");
  const [level4, setLevel4] = useState("");
  const [error, setError]= useState(null);
  const router = useRouter();
  const candidate_id = usePathname().split("/")[2];
  // const dispatch = useDispatch();

  const skills = useMemo(
    () => [
      { skill: skill1, level: level1 },
      { skill: skill2, level: level2 },
      { skill: skill3, level: level3 },
      { skill: skill4, level: level4 },
    ],
    [level1, level2, level3, level4, skill1, skill2, skill3, skill4],
  );

  const filledSkills = useMemo(
    () => skills.filter((skillObj) => skillObj.skill || skillObj.level),
    [skills],
  );

  const payload = useMemo(
    () => ({
      endpoint: "set-expertise",
      method: "PUT",
      body: {
        customer_id: candidate_id,
        expertise: filledSkills,
      },
    }),
    [candidate_id, filledSkills],
  );

  const handleStartAssessment = async () => {

    const hasEmptyFields = filledSkills.some(
      (skillObj) => !skillObj.skill || !skillObj.level
    );
  
    if (hasEmptyFields) {
      setError("All skill fields and levels are required.");
    }else{
      setError(null);
      const result = await mvp2ApiHelper(payload);
      if (result.status === 200) {
        //router.push(`/candidate/${candidate_id}/test`,{skills:filledSkills})
        // dispatch(setFilledSkills(filledSkills));
        router.push(`/candidate/${candidate_id}/test`);
      }
    }
    
    // console.log(payload.body)
  };

  const handleBack = async () => {
    setOverlayVisible(false);
  };

  return (
    <div className="size-full flex-grow gap-8 rounded-4xl bg-neutral-white px-8 py-10">
      <Heading sm className="font-[350]" style={{ fontSize: "40px" }}>
        Here’s Where Your Journey Begins
      </Heading>

      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex h-auto w-auto flex-col items-center justify-center space-y-6">
          {/* Profile Image */}
          <div className="relative h-[140px] w-[140px] overflow-hidden rounded-full bg-bg-avatar">
            <Image
              src={"/avatars/avatar-3.svg"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              alt="Avatar image"
            />
          </div>

          {/* Welcome Message */}
          <div className="text-center">
            <Heading sm className="font-medium" style={{ fontSize: "34px" }}>
              Welcome, {candidate?.name || "Richard Feynman"}
            </Heading>
            <p className="text-grey-primary-shade-30">
              Are you ready to tackle the AI Assessment to stand out amongst
              other candidates?
            </p>
          </div>

          <div>
            <button
              onClick={() => setOverlayVisible(true)}
              className="flex flex-row items-center justify-between gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold capitalize text-neutral-white"
            >
              Evaluate yourself
              <Image
                width={23}
                height={24.3}
                src={"/evaluate-yourself.svg"}
                alt="Evaluate yourself ic on"
              />
            </button>
          </div>
        </div>
      </div>
      {isOverlayVisible && (
        <Overlay width={"70.75rem"} height={"83%"} isVisible={isOverlayVisible}>
          <AddSkillForm
            skill1={skill1}
            setSkill1={setSkill1}
            skill2={skill2}
            setSkill2={setSkill2}
            skill3={skill3}
            setSkill3={setSkill3}
            skill4={skill4}
            setSkill4={setSkill4}
            level1={level1}
            setLevel1={setLevel1}
            level2={level2}
            setLevel2={setLevel2}
            level3={level3}
            setLevel3={setLevel3}
            level4={level4}
            setLevel4={setLevel4}
            onContinue={handleStartAssessment}
            onBack={handleBack}
            error={error}
            //onBack={}
            //   codingExpertise={codingExpertise}
            //   setCodingExpertise={setCodingExpertise}
            //   isTestRequired={isTestRequired}
            //   setIsTestRequired={setIsTestRequired}
            //   expertiseRef={expertiseRef}
            //   setTechStack={setTechStack}
          />
        </Overlay>
      )}
    </div>
  );
}

export default CandidateEvaluateYourselfCard;
