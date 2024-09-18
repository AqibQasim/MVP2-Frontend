"use client";
import TestInstruction from "@/components/TestInstruction";
// import QuestionBox from "../../components/QuestionBox";
// import styles from "@/styles/test.module.css";
import { useState } from "react";

const page = () => {
  const [instructionsPopup, setInstructionsPopup] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const closePopup = () => {
    setInstructionsPopup(false);
  };

  const instructions = [
    "Make sure your connection is stable.",
    "Your score will reflect on your profile.",
    "Avoid Refreshing your page during interview",
    "Give your answers in English",
    `Make sure there’s no background noise while answering the
  questions.`,
  ];

  return (
    <>
      {instructionsPopup && (
        <TestInstruction isLoading={isLoading} setIsLoading={setIsLoading} onClose={closePopup} options={instructions} />
      )}
      {/* <div className={styles.superContainer}>
        <QuestionBox isLoading={isLoading} setIsLoading={setIsLoading} hasStarted={!instructionsPopup} />
      </div> */}
    </>
  );
};

export default page;
