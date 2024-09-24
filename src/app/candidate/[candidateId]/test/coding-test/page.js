"use client";
import { useCallback, useEffect, useState } from "react";
import CodingChild from "@/components/CodingChild";
import { useParams, useRouter } from "next/navigation";
import ErrorIndicator from "@/components/ErrorIndicator";
import TestInstruction from "@/components/TestInstruction";
import styles from "@/styles/coding-excercise.module.css";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";

const page = () => {
  const router = useRouter();
  const [Code, setCode] = useState(null);
  const [language, setLanguage] = useState(null);
  const [output, setOutput] = useState();
  const [exampleInput, setExampleInput] = useState(null);
  const [exampleOutput, setExampleOutput] = useState(null);
  const [question, setQuestion] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [constraints, setConstraints] = useState();
  const [timeLeft, setTimeLeft] = useState(600);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [message, setMessage] = useState(false);
  const [instructionsPopup, setInstructionsPopup] = useState(true);
  const [hasQuestionGenerated, setHasQuestionGenerated] = useState(false);
  const params = useParams();
  const cid = params.candidateId;

  const fetchCodingQuestion = () => {
    const codingTestPayload = {
      endpoint: `get-coding-question?candidate_id=${params.candidateId}`,
      method: "GET",
    };
    mvp2ApiHelper(codingTestPayload).then((result) => {
      if (result.status === 200) {
        let codingQuestion = result?.data?.codingQuestion?.assessment;
        setQuestion(codingQuestion?.codingQuestion);
        setConstraints(codingQuestion?.constraints);
        setExampleInput(codingQuestion?.exampleInput);
        setExampleOutput(codingQuestion?.exampleOutput);
        setHasQuestionGenerated(true);
      }
    });
  };

  // Run fetchCodingQuestion only once when the component mounts
  useEffect(() => {
    fetchCodingQuestion();
  }, []);

  const closePopup = () => {
    setInstructionsPopup(false);
  };

  const showError = (message) => {
    setMessage(message);
    setShowErrorMessage(true);

    setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000);
  };

  async function executeCode() {
    const reqBody = {
      language: language,
      versionIndex: 1,
      script: Code,
    };
    if (!language) {
      console.log("Please select a programming language.");
      showError("Please select a programming language.");
      return;
    }
    console.log("req body:", reqBody);
    setIsLoading(true);
    const executeCodePayload = {
      endpoint: "execute-code",
      method: "POST",
      body: reqBody,
    };

    mvp2ApiHelper(executeCodePayload).then((data) => {
      console.log("response: ", data);
      setOutput(data?.data?.data?.output);
      console.log(output);
      setIsLoading(false);
    });
  }

  // useEffect(() => {
  //   const testcomplete = localStorage.getItem("codingtestcompleted");
  //   if (testcomplete) {
  //     // router.push(`/test-submit-completion/${cid}`);
  //   }
  // }, []);

  function codeSubmitHandler() {
    setIsLoading(true);
    //localStorage.setItem("codingtestcompleted", "true");
    const reqBody = {
      code: Code,
      exercise: question,
      output: output,
      constraints: constraints,
      candidate_id: cid,
    };

    const codeSubmitPayload = {
      endpoint: "get-code-submit",
      body: reqBody,
      method: "POST",
    };

    mvp2ApiHelper(codeSubmitPayload).then((data) => {
      console.log("response: ", data);
      if (data.status === 200) {
        router.push(`/candidate/${params.candidateId}/test/submit-test`);
      }
    });

    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/get-code-submit`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify(reqBody),
    //     headers: { "Content-type": "application/json" },
    //   }
    // );

    // const data = await response.json();
    // console.log("response: ", data);
    setIsLoading(false);
  }

  const formatTime = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (instructionsPopup) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          codeSubmitHandler();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [instructionsPopup]);

  const instructions = [
    "Please select the programming language first.",
    "For the questions requiring input, code a hardcoded input in available instead of input function call.",
  ];

  return (
    <html lang="en">
      <body>
        <div className={styles.codingExcercise}>
          {showErrorMessage && (
            <ErrorIndicator
              showErrorMessage={showErrorMessage}
              msgText={message}
            />
          )}
          {!hasQuestionGenerated ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
              <div className={styles.loader}></div>
              <div className={styles.generatingResultText}>
                Please wait, it might take some time, AI is generating your
                coding question.
              </div>
            </div>
          ) : (
            <>
              {instructionsPopup && (
                <TestInstruction
                  onClose={closePopup}
                  heading="Coding Instructions"
                  options={instructions}
                />
              )}
              <CodingChild
                cid={cid}
                formatTime={formatTime}
                timeLeft={timeLeft}
                codeSubmitHandler={codeSubmitHandler}
                constraints={constraints}
                setConstraints={setConstraints}
                question={question}
                setQuestion={setQuestion}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                output={output}
                exampleInput={exampleInput}
                exampleOutput={exampleOutput}
                executeCode={executeCode}
                code={Code}
                language={language}
                setCode={setCode}
                setLanguage={setLanguage}
              />
            </>
          )}
        </div>
      </body>
    </html>
  );
};
export default page;
