// import { useFormContext } from "@/contexts/FormContext";
import { getSvg } from "@/utils/helper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../styles/AddSkillForm.module.css";
import ButtonBack from "./ButtonBack";
import ButtonCapsule from "./ButtonCapsule";
import Heading from "./Heading";

// useFormContext
const AddSkillForm = ({
  skill1,
  setSkill1,
  skill2,
  setSkill2,
  skill3,
  setSkill3,
  skill4,
  setSkill4,
  level1,
  setLevel1,
  level2,
  setLevel2,
  level3,
  setLevel3,
  level4,
  setLevel4,
  onContinue,
  onBack,
  error
  // setCodingExpertise,
  // setTechStack,
  // isTestRequired,
  // setIsTestRequired,
}) => {
  // const [codingSkill, setCodingSkill] = useState("");
  // const [codingLevel, setCodingLevel] = useState("beginner");
  // const [queryIcons, setQueryIcons] = useState([]);

  // console.log("Icons state", queryIcons);

  // useEffect(() => {
  //   const FormSubmissionHandler = (e) => {
  //     const skills = [
  //       { skill: skill1, level: level1 },
  //       { skill: skill2, level: level2 },
  //       { skill: skill3, level: level3 },
  //       { skill: skill4, level: level4 },
  //     ];

  //     const filledSkills = skills.filter((skillObj) => skillObj.skill);
  //     //setTechStack(filledSkills);
  //   };

  //   FormSubmissionHandler();
  // }, [skill1, skill2, skill3, skill4, level1, level2, level3, level4]);

  // useEffect(() => {
  //   const skills = [{ skill: codingSkill, level: codingLevel }];

  //   const filledSkills = skills.filter((skillObj) => skillObj.skill);
  //   //setCodingExpertise(filledSkills);
  // }, [codingSkill, codingLevel]);

  const iconSize = 25;
  const router = useRouter();

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-8">
        <div className="w-full justify-start">
          <Heading className="!font-medium">
            Technologies You’ll Be Asked about
          </Heading>
        </div>

        <div className="h-[100%] w-[90%] space-y-4">
          <div
            className={`${styles.inputField} ${skill1 ? styles.filled : ""}`}
          >
            <div className="relative flex w-[80%] items-center gap-[5px]">
              <Image
                className={styles.img}
                src={skill1.length > 1 ? getSvg(skill1) : "/skills/Award.svg"}
                width={iconSize}
                height={iconSize}
              />
              <input
                type="text"
                value={skill1}
                placeholder="Add Required Skill"
                onChange={(e) => setSkill1(e.target.value)}
              />
            </div>

            <select
              value={level1 || ""} // Fallback to empty string if level1 is undefined or null
              onChange={(e) => setLevel1(e.target.value)}
            >
              <option value="" disabled>
                Choose level of difficulty
              </option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div
            className={`${styles.inputField} ${skill2 ? styles.filled : ""}`}
          >
            <div className="relative flex w-[80%] items-center gap-[5px]">
              <Image
                className={styles.img}
                src={skill2.length > 1 ? getSvg(skill2) : "/skills/Award.svg"}
                width={iconSize}
                height={iconSize}
              />
              <input
                type="text"
                value={skill2}
                placeholder="Add Required Skill"
                onChange={(e) => setSkill2(e.target.value)}
              />
            </div>

            <select
              value={level2 || ""} // Fallback to empty string if level1 is undefined or null
              onChange={(e) => setLevel2(e.target.value)}
            >
              <option value="" disabled>
                Choose level of difficulty
              </option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div
            className={`${styles.inputField} ${skill3 ? styles.filled : ""}`}
          >
            <div className="relative flex w-[80%] items-center gap-[5px]">
              <Image
                className={styles.img}
                src={skill3.length > 1 ? getSvg(skill3) : "/skills/Award.svg"}
                width={iconSize}
                height={iconSize}
              />
              <input
                type="text"
                value={skill3}
                placeholder="Add Required Skill"
                onChange={(e) => setSkill3(e.target.value)}
              />
            </div>

            <select
              value={level3 || ""} // Fallback to empty string if level1 is undefined or null
              onChange={(e) => setLevel3(e.target.value)}
            >
              <option value="" disabled>
                Choose level of difficulty
              </option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div
            className={`${styles.inputField} ${skill4 ? styles.filled : ""}`}
          >
            <div className="relative flex w-[80%] items-center gap-[5px]">
              <Image
                className={styles.img}
                src={skill4.length > 1 ? getSvg(skill4) : "/skills/Award.svg"}
                width={iconSize}
                height={iconSize}
              />
              <input
                type="text"
                value={skill4}
                placeholder="Add Required Skill"
                onChange={(e) => setSkill4(e.target.value)}
              />
            </div>

            <select
              value={level4 || ""} // Fallback to empty string if level1 is undefined or null
              onChange={(e) => setLevel4(e.target.value)}
            >
              <option value="" disabled>
                Choose level of difficulty
              </option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          {
            error && (
              <div className="flex justify-center pr-7 pt-2 text-red-500">
                {error}
              </div>
            )
          }
          <div className="flex justify-end pr-7 pt-2">
            <ButtonBack
              onClick={onBack}
              className={"flex w-[220px] items-center !justify-start !gap-3"}
            >
              Back
            </ButtonBack>
            <ButtonCapsule onPress={onContinue}>Start Assessment</ButtonCapsule>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddSkillForm;
