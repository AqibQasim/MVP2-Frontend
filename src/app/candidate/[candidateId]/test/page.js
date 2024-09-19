"use client";
import QuestionBox from "@/components/QuestionBox";
import TestInstruction from "@/components/TestInstruction";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
// import QuestionBox from "../../components/QuestionBox";
import styles from "@/styles/test.module.css";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";

const page = ({ params }) => {
  const [instructionsPopup, setInstructionsPopup] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState(null);

  const closePopup = () => {
    setInstructionsPopup(false);
  };
  //const filledSkills = useSelector((state) => state.skills.filledSkills);

  const skillsPayload = useMemo(
    () => ({
      endpoint: `get-customer-expertise?customer_id=${params.candidateId}`,
      method: "GET",
    }),
    [],
  );

  const payload = useMemo(
    () => ({
      endpoint: "prepare-test",
      method: "POST",
      body: {
        customer_id: params.candidateId,
        expertise: skills,
      },
    }),
    [],
  );

  // console.log(payload)

  //question generate
  useEffect(() => {
    setIsLoading(true);
    fetchCandidateSkills();
  }, []);

  const fetchCandidateSkills = useCallback(async () => {
    mvp2ApiHelper(skillsPayload).then((result) => {
      if (result.status === 200) {
        setSkills(result.data.data);
      }
    });
    // console.log(payload.body)
  },[skillsPayload]);


  const prepareTest = useCallback(async () => {
    mvp2ApiHelper(payload).then((result) => {
      if (result.status === 200) {
        setSkills(result.data.data);
        setIsLoading(false);
      }
    });
    // console.log(payload.body)
  },[skillsPayload]);

  const instructions = [
    "Make sure your connection is stable.",
    "Your score will reflect on your profile.",
    "Avoid Refreshing your page during interview",
    "Give your answers in English",
    `Make sure there’s no background noise while answering the
  questions.`,
  ];

  console.log(skills)

  return (
    <html lang="en">
      <body>
        {instructionsPopup && (
          <TestInstruction
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onClose={closePopup}
            options={instructions}
          />
        )}
        <div className={styles.superContainer}>
          <QuestionBox
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            hasStarted={!instructionsPopup}
          />
        </div>
      </body>
    </html>
  );
};

export default page;
