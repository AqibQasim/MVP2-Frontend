import CodingLeftComponent from "./CodingLeftComponent";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import styles from "@/styles/styles.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import ConfirmSubmit from "./ConfirmSubmit";

const CodingChild = ({
  formatTime,
  timeLeft,
  question,
  setQuestion,
  codeSubmitHandler,
  constraints,
  setConstraints,
  setIsLoading,
  isLoading,
  exampleOutput,
  exampleInput,
  executeCode,
  output,
  code,
  language,
  setCode,
  setLanguage,
}) => {
  const selectLanguageRef = useRef(null);
  const isAllowed = language !== null;

  // useEffect(() => {
  //   if (router.isReady) {
  //     const { cid, a_id, pid } = router.query;
  //     setAssessmentId(a_id);
  //     setPositionId(pid);
  //     setCandidateId(cid);

  //     const rBody = {
  //       assessment_id: a_id,
  //       position_id: pid,
  //       candidate_id: cid,
  //     };
  //     setRequestBody(rBody);
  //   }
  // }, [router.isReady, router.query]);

  // const getActiveComponent = () => {
  //   const activeFlow = localStorage.getItem("activeFlow");
  //   setActvflow(activeFlow);
  //   console.log("Current active flow:", activeFlow);
  //   switch (activeFlow) {
  //     case "Candidate_self":
  //       return `/get-coding-assessment-self`;
  //     case "Client":
  //       return `/get-coding-assessment`;
  //     default:
  //       return null;
  //   }
  // };

  const handleKeyDown = (e) => {
    const { key, target, shiftKey } = e;
    if (key === "Tab") {
      e.preventDefault();
      const { value, selectionStart, selectionEnd } = target;
      const tabCharacter = "    "; // Define the indentation. This should match the forward tab.
      if (shiftKey) {
        // Handle Shift + Tab for back-indentation
        const beforeCursor = value.substring(0, selectionStart);
        const afterCursor = value.substring(selectionEnd);
        // Check if the text before the cursor ends with a tab character (or spaces if using spaces for tabs)
        if (beforeCursor.endsWith(tabCharacter)) {
          target.value =
            beforeCursor.slice(0, -tabCharacter.length) + afterCursor;
          const newCursorPos = selectionStart - tabCharacter.length;
          target.selectionStart = target.selectionEnd = newCursorPos;
        }
      } else {
        // Handle Tab for forward indentation
        const beforeTab = value.substring(0, selectionStart);
        const afterTab = value.substring(selectionEnd);
        target.value = beforeTab + tabCharacter + afterTab;
        target.selectionStart = target.selectionEnd =
          selectionStart + tabCharacter.length;
      }
      setCode(target.value);
    }
  };

  // useEffect(() => {
  //   const fetchCodingQues = async () => {
  //     if (!router.isReady || !requestBody) return;

  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_REMOTE_URL}${getActiveComponent()}`,
  //         {
  //           method: "POST",
  //           body: JSON.stringify(requestBody),
  //           headers: { "Content-type": "application/json" },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`Error: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setQuestion(data?.data?.assesment);
  //       setConstraints(data?.data?.assesment?.constraints);
  //       console.log("response of coding Question  : ", data);
  //     } catch (error) {
  //       console.error("Failed to fetch coding question:", error);
  //     }
  //   };

  //   fetchCodingQues();
  // }, [router.isReady, requestBody]);

  const handleCodeTextareaClick = () => {
    if (isAllowed) return;
    selectLanguageRef.current.focus();
  };

  const formattedTime = formatTime(timeLeft);

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-[#F5F5F5]">
      <div className="flex h-[100%] w-[98%] items-center justify-between">
        <CodingLeftComponent
          question={question}
          constraints={constraints}
          exampleInput={exampleInput}
          exampleOutput={exampleOutput}
        />

        <div className="flex h-[95%] w-[70%] flex-col justify-between">
          <div className="flex h-[63%] w-[100%] flex-col items-center rounded-2xl bg-[#fff]">
            <div className="flex h-[4rem] w-[100%] justify-center">
              <div className="flex h-[100%] w-[95%] items-center gap-2 border-b-[1px] border-[#EBEBEB]">
                <span className="rounded-2xl bg-[#F0EDFC] px-3 py-[0.25rem] text-sm font-semibold text-[#6137DB]">
                  Code
                </span>
                <select
                  ref={selectLanguageRef}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`rounded-2xl bg-[#F0EDFC] px-3 py-[0.35rem] text-sm font-semibold text-[#4A525D] outline-1 outline-offset-2 focus:outline ${
                    !isAllowed
                      ? "outline-danger focus:bg-danger-bg"
                      : "outline-primary"
                  }`}
                >
                  <option value="">Select programming language</option>
                  <option value="python3">Python</option>
                  <option value="java">Java</option>
                  <option value="nodejs">Node JS</option>
                  <option value="c">C</option>
                </select>

                <span className="flex items-center gap-2 rounded-2xl bg-[#6137DB] px-3 py-[0.25rem] text-sm font-semibold text-[#F0EDFC]">
                  <Image
                    alt="Time icon"
                    src="/timer.svg"
                    height={12}
                    width={12}
                  />
                  {formattedTime}
                </span>
              </div>
            </div>

            <div
              onClick={handleCodeTextareaClick}
              className={`flex h-[80%] w-[95%] flex-col items-center ${
                !isAllowed && "cursor-not-allowed"
              }`}
            >
              <textarea
                disabled={!isAllowed}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`h-[85%] max-h-[90%] w-[100%] resize-none outline-none disabled:cursor-not-allowed ${
                  !isAllowed && "relative -z-10"
                }`}
              ></textarea>

              <div className="flex h-[20%] w-[100%] items-center justify-end gap-4">
                <button
                  onClick={executeCode}
                  className="flex items-center gap-3 rounded-3xl bg-[#F8F7FA] px-4 py-4 font-sans font-semibold"
                >
                  <Image src="/playBlack.svg" height={15} width={15} />
                  Run
                </button>
                <Modal>
                  <Modal.Open opens="confirm-code">
                    <button className="flex w-[20%] items-center justify-between gap-3 rounded-3xl bg-[#6137DB] px-4 py-4 font-sans font-semibold text-white">
                      Submit <Image src="/Tick.svg" height={15} width={15} />
                    </button>
                  </Modal.Open>
                  <Modal.Window
                    name="confirm-code"
                    classes="min-w-[35.5rem] min-h-[15.6rem]"
                  >
                    {isLoading ? (
                      <div className="flex h-full min-h-[15.6rem] w-full min-w-[35.5rem] items-center justify-center">
                        <div className={styles.loader}></div>
                      </div>
                    ) : (
                      <ConfirmSubmit onSubmit={codeSubmitHandler} />
                    )}
                  </Modal.Window>
                </Modal>
              </div>
            </div>
          </div>

          <div className="h-[35%] w-[100%] rounded-2xl bg-[#fff]">
            <div className="flex h-[4rem] w-[95%] justify-center">
              <div className="flex h-[100%] w-[95%] items-center border-b-[1px] border-[#EBEBEB]">
                <span className="rounded-2xl bg-[#F0EDFC] px-3 py-1 text-sm font-semibold text-[#6137DB]">
                  Test Result
                </span>
              </div>
            </div>

            <div className="ml-[1.2rem] h-[80%] w-[100%]">
              <>{output}</>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingChild;

// README: Adjusting z-index to handle disabled text area clicks
// We overlap the parent element when the text area is disabled
// to ensure that clicks are detected on the parent.
// Commented out the 'autoFocus' feature because the instructions popup would remove focus anyway. This way, when the user tries to type in the code without selecting a language, it will automatically get focused.
