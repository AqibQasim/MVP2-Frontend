"use client";
import QuestionBox from "@/components/QuestionBox";
import TestInstruction from "@/components/TestInstruction";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import styles from "@/styles/test.module.css";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";

const page = ({ params }) => {
  const [instructionsPopup, setInstructionsPopup] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState(null);
  const hasPreparedTest = useRef(false); // Ref to track if prepareTest has been called

  const closePopup = () => {
    setInstructionsPopup(false);
  };

  const skillsPayload = useMemo(
    () => ({
      endpoint: `get-customer-expertise?customer_id=${params.candidateId}`,
      method: "GET",
    }),
    [params.candidateId],
  );

  const prepareTestpayload = useMemo(
    () => ({
      endpoint: "prepare-test",
      method: "POST",
      body: {
        customer_id: params.candidateId,
        expertise: skills,
      },
    }),
    [params.candidateId, skills],
  );

  useEffect(() => {
    setIsLoading(true);
    fetchCandidateSkills();
  }, [skillsPayload]);

  const fetchCandidateSkills = useCallback(async () => {
    mvp2ApiHelper(skillsPayload).then((result) => {
      if (result.status === 200) {
        setSkills(result.data.data);
      }
    });
  }, [skillsPayload]);

  useEffect(() => {
    if (skills && !hasPreparedTest.current) {
      prepareTest();
      hasPreparedTest.current = true; // Set the flag to true after prepareTest is called
    }
  }, [skills]);

  const prepareTest = useCallback(async () => {
    mvp2ApiHelper(prepareTestpayload).then((result) => {
      if (result.status === 200) {
        console.log(result.data);
        setIsLoading(false);
      }
    });
  }, [prepareTestpayload]);

  const instructions = [
    "Make sure your connection is stable.",
    "Your score will reflect on your profile.",
    "Avoid refreshing your page during the interview.",
    "Give your answers in English.",
    "Make sure there’s no background noise while answering the questions.",
  ];

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
