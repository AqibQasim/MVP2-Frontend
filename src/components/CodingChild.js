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
    const router = useRouter();
    const [requestBody, setRequestBody] = useState(null);
    const [actvFlow, setActvflow] = useState(null);
    const [assessmentId, setAssessmentId] = useState(null);
    const [positionId, setPositionId] = useState(null);
    const [candidateId, setCandidateId] = useState(null);
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
      <div className="w-full h-screen bg-[#F5F5F5] justify-center items-center flex overflow-hidden">
        <div className="w-[98%] h-[100%] items-center flex justify-between">
          <CodingLeftComponent question={question} constraints={constraints} exampleInput={exampleInput} exampleOutput={exampleOutput}/>
  
          <div className="w-[70%] h-[95%] flex flex-col justify-between ">
            <div className="w-[100%] flex flex-col items-center h-[63%] rounded-2xl bg-[#fff]">
              <div className="w-[100%] h-[4rem] flex justify-center">
                <div className="w-[95%] h-[100%] border-b-[1px] border-[#EBEBEB] flex items-center gap-2">
                  <span className="bg-[#F0EDFC] py-[0.25rem] px-3 rounded-2xl text-sm font-semibold text-[#6137DB]">
                    Code
                  </span>
                  <select
                    ref={selectLanguageRef}
                    onChange={(e) => setLanguage(e.target.value)}
                    className={`bg-[#F0EDFC] py-[0.35rem] px-3 rounded-2xl text-sm font-semibold text-[#4A525D] outline-offset-2 outline-1 focus:outline ${
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
  
                  <span className="bg-[#6137DB] py-[0.25rem] flex items-center px-3 rounded-2xl text-sm font-semibold text-[#F0EDFC] gap-2">
                    <Image src="/timer.svg" height={12} width={12} />
                    {formattedTime}
                  </span>
                </div>
              </div>
  
              <div
                onClick={handleCodeTextareaClick}
                className={`h-[80%] w-[95%] flex flex-col items-center ${
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
  
                <div className="w-[100%] h-[20%] flex justify-end items-center gap-4">
                  <button
                    onClick={executeCode}
                    className="flex items-center gap-3 py-4 px-4 bg-[#F8F7FA] rounded-3xl font-semibold font-sans"
                  >
                    <Image src="/playBlack.svg" height={15} width={15} />
                    Run
                  </button>
                  <Modal>
                    <Modal.Open opens="confirm-code">
                      <button className="flex w-[20%] justify-between items-center gap-3 rounded-3xl py-4 px-4 font-sans font-semibold  text-white bg-[#6137DB]">
                        Submit <Image src="/Tick.svg" height={15} width={15} />
                      </button>
                    </Modal.Open>
                    <Modal.Window
                      name="confirm-code"
                      classes="min-w-[35.5rem] min-h-[15.6rem]"
                    >
                      {isLoading ? (
                        <div className="w-full h-full min-w-[35.5rem] min-h-[15.6rem] flex justify-center items-center">
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
  
            <div className="w-[100%] h-[35%] rounded-2xl bg-[#fff]">
              <div className="w-[95%] h-[4rem] flex justify-center">
                <div className="w-[95%] h-[100%] border-b-[1px] border-[#EBEBEB] flex items-center">
                  <span className="bg-[#F0EDFC] py-1 px-3 rounded-2xl text-sm font-semibold text-[#6137DB]">
                    Test Result
                  </span>
                </div>
              </div>
  
              <div className="ml-[1.2rem] w-[100%] h-[80%] ">
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
  