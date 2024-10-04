"use client";
import QuestionBox from "@/components/QuestionBox";
import TestInstruction from "@/components/TestInstruction";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import styles from "@/styles/test.module.css";

const Page = ({ params }) => {
  const [instructionsPopup, setInstructionsPopup] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState(null);
  const hasPreparedTest = useRef(false); // Ref to track if prepareTest has been called
  const [questions, setQuestions] = useState(null);
  const [codingQuestion, setCodingQuestions] = useState(null);

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

  // const codingTestPayload = useMemo(
  //   () => ({
  //     endpoint: `get-coding-question?candidate_id=${params.candidateId}`,
  //     method: "GET",
  //   }),
  //   [],
  // );

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

  // const fetchCodingQuestion = useCallback(async () => {
  //   mvp2ApiHelper(codingTestPayload).then((result) => {
  //     if (result.status === 200) {
  //       setCodingQuestions(result.data?.codingQuestion);
  //     }
  //   });
  // }, [prepareTestpayload]);

  useEffect(() => {
    if (skills && !hasPreparedTest.current) {
      prepareTest();
      //fetchCodingQuestion();
      hasPreparedTest.current = true; // Set the flag to true after prepareTest is called
    }
  }, [skills]);

  const prepareTest = useCallback(async () => {
    mvp2ApiHelper(prepareTestpayload).then((result) => {
      if (result.status === 200) {
        setQuestions(result.data.message);
        setIsLoading(false);
      }
    });
  }, [prepareTestpayload]);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const instructions = [
    "Make sure your connection is stable.",
    "Your score will reflect on your profile.",
    "Avoid refreshing your Page during the interview.",
    "Give your answers in English.",
    "Make sure there’s no background noise while answering the questions.",
  ];

  console.log(
    "/////////////////////////////////////////////////////",
    codingQuestion,
  );

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
            questions={questions}
            codingQuestions={codingQuestion}
          />
        </div>
      </body>
    </html>
  );
};

export default Page;
