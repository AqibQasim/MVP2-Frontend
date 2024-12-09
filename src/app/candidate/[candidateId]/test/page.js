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
  const [candidateReport, setCandidateReport] = useState(null);
  const [codingQuestion, setCodingQuestions] = useState(null);
 

 
  const getCandidateResult = () => {
    const payload = {
      endpoint: `get-customer-result?customer_id=${params.candidateId}`,
      method: "GET",
    };
    mvp2ApiHelper(payload).then((result) => {
      if (result) setCandidateReport(result?.data?.data);
    });
  };
//// new
  useEffect(() => {
    getCandidateResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

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

  return (
    <html lang="en">
      
     {candidateReport && Object.keys(candidateReport).length > 0 ? (
        <div className="text-5xl">You have already given the test</div>
      ) : (
 
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
    )}
    </html>
  );
};

export default Page;

