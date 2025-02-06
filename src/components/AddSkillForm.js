import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../styles/AddSkillForm.module.css";
import ButtonBack from "./ButtonBack";
import ButtonCapsule from "./ButtonCapsule";
import Heading from "./Heading";
import { getSvg } from "@/utils/helper";

const AddSkillForm = ({
  skill1,
  setSkill1,
  skill2,
  setSkill2,
  skill3,
  setSkill3,
  skill4,
  setSkill4,
  skill5,
  setSkill5,
  level1,
  setLevel1,
  level2,
  setLevel2,
  level3,
  setLevel3,
  level4,
  setLevel4,
  level5,
  setLevel5,
  onContinue,
  onBack,
  error,
}) => {
  const [incrementSkillSet, setIncrementSkillSet] = useState(3);
  const [duplicateError, setDuplicateError] = useState("");

  const iconSize = 25;
  const router = useRouter();

  // Combine all skills and check for duplicates
  useEffect(() => {
    const skills = [skill1, skill2, skill3, skill4, skill5].filter(Boolean);
    const skillSet = new Set(skills);

    if (skills.length !== skillSet.size) {
      setDuplicateError("Duplicate skills are not allowed.");
    } else {
      setDuplicateError("");
    }
  }, [skill1, skill2, skill3, skill4, skill5]);

  const isButtonDisabled = !!duplicateError;

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-8">
        <div className="w-full justify-start">
          <Heading className="!font-medium">
          Add your skill
          </Heading>
        </div>
        <button
          onClick={onBack}
          className="absolute right-2 top-2 text-4xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <div className="h-[100%] w-[90%] space-y-4">
          {/* Skill 1 */}
          <div
            className={`${styles.inputField} ${skill1 ? styles.filled : ""}`}
          >
            <div className="relative flex w-[80%] items-center gap-[5px]">
              <Image
                className={styles.img}
                src={skill1?.length > 1 ? getSvg(skill1) : "/skills/Award.svg"}
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
              value={level1 || ""}
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

          {/* Skill 2 */}
          <div
            className={`${styles.inputField} ${skill2 ? styles.filled : ""}`}
          >
            <div className="relative flex w-[80%] items-center gap-[5px]">
              <Image
                className={styles.img}
                src={skill2?.length > 1 ? getSvg(skill2) : "/skills/Award.svg"}
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
              value={level2 || ""}
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

          {/* Skill 3 */}
          <div
            className={`${styles.inputField} ${skill3 ? styles.filled : ""}`}
          >
            <div className="relative flex w-[80%] items-center gap-[5px]">
              <Image
                className={styles.img}
                src={skill3?.length > 1 ? getSvg(skill3) : "/skills/Award.svg"}
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
              value={level3 || ""}
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

          {/* Skill 4 */}
          {incrementSkillSet >= 4 && (
            <div
              className={`${styles.inputField} ${skill4 ? styles.filled : ""}`}
            >
              <div className="relative flex w-[80%] items-center gap-[5px]">
                <Image
                  className={styles.img}
                  src={
                    skill4?.length > 1 ? getSvg(skill4) : "/skills/Award.svg"
                  }
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
                value={level4 || ""}
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
          )}
          {incrementSkillSet === 5 && (
            <div
              className={`${styles.inputField} ${skill5 ? styles.filled : ""}`}
            >
              <div className="relative flex w-[80%] items-center gap-[5px]">
                <Image
                  className={styles.img}
                  src={skill5.length > 1 ? getSvg(skill5) : "/skills/Award.svg"}
                  width={iconSize}
                  height={iconSize}
                />
                <input
                  type="text"
                  value={skill5}
                  placeholder="Add Required Skill"
                  onChange={(e) => setSkill5(e.target.value)}
                />
              </div>
              <select
                value={level5 || ""} // Fallback to empty string if level1 is undefined or null
                onChange={(e) => setLevel5(e.target.value)}
              >
                <option value="" disabled>
                  Choose level of difficulty
                </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          )}

          {/* Duplicate error */}
          {duplicateError && (
            <div className="text-center text-sm text-red-500">
              {duplicateError}
            </div>
          )}

          {incrementSkillSet >= 3 && incrementSkillSet < 5 && (
            <div
              onClick={() => setIncrementSkillSet((prev) => prev + 1)}
              className="w-full cursor-pointer justify-end pr-8 text-end text-primary"
            >
              Add More
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end pr-7 pt-2">
            <ButtonBack
              onClick={onBack}
              className={"flex w-[220px] items-center !justify-start !gap-3"}
            >
              Back
            </ButtonBack>
            <ButtonCapsule
              onPress={onContinue}
              disabled={isButtonDisabled}
              className={`${
                isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Start Assessment
            </ButtonCapsule>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSkillForm;
