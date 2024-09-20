"use client";
import styles from "../styles/QuestionBox.module.css";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSpeechSynthesis } from "react-speech-kit";
import ErrorIndicator from "./ErrorIndicator";

const QuestionBox = ({ hasStarted, setIsLoading, isLoading, questions }) => {
  // const { test } = useTest();
  const router = useRouter();
  const cid = usePathname().split("/")[2];
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(130);
  const [newQuestions, setNewQuestions] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURLs, setAudioURLs] = useState({});
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [answers, setAnswers] = useState([]);
  //const {question_id } = router?.query;
  const [recordingDone, setRecordingDone] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [disableRecordingButton, setDisableRecordingButton] = useState(false);
  //const [questions, setQuestions] = useState();
  const { speak, cancel } = useSpeechSynthesis();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const currentRecordingQuestionIndexRef = useRef(currentQuestion);
  const [message, setMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isGeneratingResult, setIsGeneratingResult] = useState(false);
  const [isTranscriptionComplete, setIsTranscriptionComplete] = useState();
  const isProcessingRef = useRef();
  const isLastQuestion = currentQuestion === newQuestions?.length;
  const [isRecordingPopupVisible, setIsRecordingPopupVisible] = useState(false);
  const minutes = Math.floor(timeLeft / 60);
  const remainingSeconds = timeLeft % 60;
  const [expertise, setExpertise] = useState();
  const [isTestRequired, setIsTestRequired] = useState();
  const [assessmentId, setAssessmentId] = useState();
  const [codeQues, setCodeQues] = useState();
  const [isFirstQues, setIsFirstQues] = useState(true);
  const [candidateExpertise, setCandidateExpertise] = useState();

  useEffect(() => {
    setNewQuestions(questions?.question);
  }, [questions]);
  // const [isFirstQues, setIsFirstQues] = useState(0);

  const speakQuestion = (questionobj) => {
    const question = questionobj.question;
    console.log(question);
    cancel();
    speak({ text: question });
  };

  useEffect(() => {
    console.log("answers:", answers);
  }, [answers]);

  // useEffect(() => {
  //   localStorage.setItem("candidate-id", cid);
  // }, [cid]);

  const processRecording = async (blob, questionIndex) => {
    const base64Data = await blobToBase64(blob);
    saveAnswer(questionIndex, base64Data);
  };

  const saveAnswer = (questionIndex, answerData) => {
    setAnswers((prev) => [
      ...prev,
      { question: questionIndex, answer: answerData },
    ]);
  };

  // useEffect(() => {
  //   const reqBody = {
  //     candidate_id: cid,
  //   };
  //   console.log("candidate_id in question box is : ", cid);

  //   const fetchCandidateExpertise = async () => {
  //     if (cid) {
  //       try {
  //         const response = await fetch(
  //           `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-one-candidate-self`,
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(reqBody),
  //           }
  //         );
  //         const data = await response.json();
  //         console.log("data from fetching a candidate:", data);
  //         setCandidateExpertise(data?.data?.expertise);
  //       } catch (err) {
  //         console.log("ERROR WHILE FETCHING:", err);
  //       }
  //     }
  //   };
  //   fetchCandidateExpertise();
  // }, [router?.isReady]);

  // useEffect(() => {
  //   async function getTestForCandidate() {
  //     if (candidateExpertise) {
  //       console.log("heyy from the if condition");
  //       const requestBody = {
  //         expertise: candidateExpertise,
  //         //position_id: pid,
  //       };
  //       console.log("req body: ", requestBody);
  //       try {
  //         const response = await fetch(
  //           `${process.env.NEXT_PUBLIC_REMOTE_URL}/prepare-test`,
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(requestBody),
  //           }
  //         );
  //         const dataOne = await response.json();
  //         console.log("response data of a test creation:", dataOne);
  //         // setNewQuestions(dataOne?.data?.message?.question);
  //         // const processedQuestions = dataOne?.data?.message?.question.map(
  //         //   (q) => ({
  //         //     ...q,
  //         //     question: removeNumericPrefix(q.question),
  //         //   })
  //         // );

  //         // if(processedQuestions){
  //         setNewQuestions(dataOne?.data?.message?.question);
  //         // }

  //         console.log("processed questions:", newQuestions);
  //         setIsLoading(false);
  //         setIsLoading(false);

  //         console.log(dataOne);
  //         setIsLoading(false);

  //         console.log("required:", isTestRequired);
  //         console.log("test is required:", test_req === "true");
  //         if (test_req === "true") {
  //           console.log("hey i am in test req");
  //           try {
  //             setIsLoading(true);
  //             const req = {
  //               codingExpertise: dataOne?.data?.expertise,
  //               //position_id: pid,
  //             };

  //             console.log("hey i am in test req try block");
  //             const response = await fetch(
  //               `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-coding-question`,
  //               {
  //                 method: "POST",
  //                 headers: {
  //                   "Content-Type": "application/json",
  //                 },
  //                 body: JSON.stringify(req),
  //               }
  //             );
  //             console.log("data fetched");
  //             const data = await response.json();
  //             setCodeQues(data);
  //             console.log("data for coding assessment:", data);
  //             setAssessmentId(data?.data?.assessment_id);
  //             console.log("assessment id:", assessmentId);
  //             console.log("code question data:", data);
  //             setIsLoading(false);
  //           } catch (err) {
  //             console.error("ERROR:", err);
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error submitting form:", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   }
  //   getTestForCandidate();
  // }, [candidateExpertise]);

  // useEffect(() => {
  //   async function getTestQuestions() {
  //     // if (pid) {
  //     try {
  //       setIsLoading(true);
  //       const reqBody = {
  //         position_id: pid,
  //       };
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-one-positions`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(reqBody),
  //         }
  //       );
  //       const data = await response.json();
  //       console.log("data fetched for a position:", data?.data?.is_test_req);

  //       console.log("candidate expertise:", candidateExpertise);
  //       setExpertise(data?.data?.expertise || candidateExpertise);
  //       if (data?.data?.expertise || candidateExpertise) {
  //         console.log("heyy from the if condition");
  //         const requestBody = {
  //           expertise: data?.data?.expertise || candidateExpertise,
  //           position_id: pid,
  //         };
  //         console.log("req body: ", requestBody);
  //         try {
  //           const response = await fetch(
  //             `${process.env.NEXT_PUBLIC_REMOTE_URL}/prepare-test`,
  //             {
  //               method: "POST",
  //               headers: {
  //                 "Content-Type": "application/json",
  //               },
  //               body: JSON.stringify(requestBody),
  //             }
  //           );
  //           const dataOne = await response.json();
  //           console.log("response data of a test creation:", dataOne);
  //           // setNewQuestions(dataOne?.data?.message?.question);
  //           // const processedQuestions = dataOne?.data?.message?.question.map(
  //           //   (q) => ({
  //           //     ...q,
  //           //     question: removeNumericPrefix(q.question),
  //           //   })
  //           // );

  //           // if(processedQuestions){
  //           setNewQuestions(dataOne?.data?.message?.question);
  //           // }

  //           console.log("processed questions:", newQuestions);
  //           setIsLoading(false);
  //           setIsLoading(false);

  //           console.log(dataOne);
  //           setIsLoading(false);

  //           console.log("required:", isTestRequired);
  //           console.log("test is required:", test_req === "true");
  //           if (test_req === "true") {
  //             console.log("hey i am in test req");
  //             try {
  //               setIsLoading(true);
  //               const req = {
  //                 codingExpertise: dataOne?.data?.expertise,
  //                 position_id: pid,
  //               };

  //               console.log("hey i am in test req try block");
  //               const response = await fetch(
  //                 `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-coding-question`,
  //                 {
  //                   method: "POST",
  //                   headers: {
  //                     "Content-Type": "application/json",
  //                   },
  //                   body: JSON.stringify(req),
  //                 }
  //               );
  //               console.log("data fetched");
  //               const data = await response.json();
  //               setCodeQues(data);
  //               console.log("data for coding assessment:", data);
  //               setAssessmentId(data?.data?.assessment_id);
  //               console.log("assessment id:", assessmentId);
  //               console.log("code question data:", data);
  //               setIsLoading(false);
  //             } catch (err) {
  //               console.error("ERROR:", err);
  //             }
  //           }
  //         } catch (error) {
  //           console.error("Error submitting form:", error);
  //         } finally {
  //           setIsLoading(false);
  //         }
  //       }
  //     } catch (err) {
  //       console.log("ERROR:", err);
  //     }
  //   }
  //   // }
  //   getTestQuestions();
  // }, [pid]);

  useEffect(() => {
    if (newQuestions) {
      console.log("value of has started", hasStarted);
      setIsFirstQues(true);
      // console.log(hasStarted);
      // setQuestions(data?.data[0]?.question);
      // console.log("there?", data?.data[0]?.question[0].question);
      speakQuestion(currentQuestion);
      console.log("questions:", questions);
    }
  }, [hasStarted]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
            console.log("Chunk recorded:", event.data.size);
          }
        };

        mediaRecorderRef.current.onstop = async () => {
          const blob = new Blob(recordedChunksRef.current, {
            type: "audio/wav",
          });
          recordedChunksRef.current = [];
          const audioURL = URL.createObjectURL(blob);
          setAudioURLs((prevURLs) => ({
            ...prevURLs,
            [currentQuestion]: audioURL,
          }));

          isProcessingRef.current = true;
          await processRecording(
            blob,
            currentRecordingQuestionIndexRef.current
          );
          isProcessingRef.current = false;
        };
      })
      .catch((err) => console.error("Error accessing the microphone:", err));
  }, [currentQuestion]);

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      cancel();
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingDone(true);
      currentRecordingQuestionIndexRef.current = currentQuestion;
      setIsRecordingPopupVisible(true);
      console.log("Recording started");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecordingPopupVisible(false);
    }
  };

  useEffect(() => {
    let timeoutId;

    if (isRecording) {
      setIsRecordingPopupVisible(true);

      timeoutId = setTimeout(() => {
        if (isRecording) {
          setIsRecordingPopupVisible(false);
        }
      }, 5000);
    } else {
      setIsRecordingPopupVisible(false);
      clearTimeout(timeoutId);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isRecording]);

  useEffect(() => {
    if (!hasStarted || isTestCompleted) {
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 1) {
          return prevTimeLeft - 1;
        } else {
          clearInterval(intervalId);
          if (isLastQuestion && !isSubmitted) {
            setIsSubmitted(true);
            submitTestHandler();
          } else if (!isLastQuestion) {
            toggleComponent();
          }
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [hasStarted, isLastQuestion, timeLeft, isSubmitted, isTestCompleted]);

  const stopMediaStreamTracks = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    return () => {
      stopMediaStreamTracks();
    };
  }, []);
  // useEffect(() => {
  //   const testcomplete = localStorage.getItem("testcompleted");
  //   if (testcomplete && assessmentId) {
  //     router.push(`/test-submit-completion/${cid}`);
  //   }
  // }, [router]);

  // useEffect(() => {
  //   console.log("Assessment ID:", assessmentId);
  // }, [assessmentId]);

  // const submitTestHandler = async () => {
  //   console.log("Submit test handler called. Assessment ID:", assessmentId);
  //   localStorage.setItem("testcompleted", "true");
  //   if (isSubmitted) return;
  //   setIsSubmitted(true);
  //   setIsGeneratingResult(true);
  //   setIsLoading(true);
  //   setIsTestCompleted(true);

  //   console.log("candidate_id in question box in take test method is : ", cid);

  //   let requestBody;
  //   const userFlow = localStorage.getItem("activeFlow");

  //   if (userFlow === "Candidate_self") {
  //     requestBody = {
  //       user_role: "Candidate_self",
  //       candidate_id: cid,
  //       question_answer: answers,
  //       position_id: pid,
  //     };
  //   } else if (userFlow === "Client") {
  //     requestBody = {
  //       user_role: "Client",
  //       candidate_id: cid,
  //       question_answer: answers,
  //       position_id: pid,
  //     };
  //   }

  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_REMOTE_URL}/take-test`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(requestBody),
  //       }
  //     );
  //     const data = await response.json();
  //     console.log("take-test api response:", data);
  //     console.log("value in test_req state:", test_req);
  //     console.log("test_req state = ", test_req === "true");
  //     console.log("a_ID:", a_id);

  //     const rBody = {
  //       position_id: pid,
  //     };

  //     if (test_req === "true" && a_id) {
  //       if (assessmentId) {
  //         console.log(
  //           "Routing to coding exercise with assessment ID:",
  //           assessmentId
  //         );
  //         router.push(
  //           `/coding-excercise?a_id=${assessmentId}&pid=${pid}&cid=${cid}`
  //         );
  //       } else {
  //         console.error("Assessment ID is not available.");
  //       }
  //     } else {
  //       const rBody = {
  //         position_id: pid,
  //       };
  //       try {
  //         // if(response?.ok){
  //         //   const response = await fetch(
  //         //     `${process.env.NEXT_PUBLIC_REMOTE_URL}/set-candidate-count`,
  //         //     {
  //         //       method: "POST",
  //         //       headers: {
  //         //         "Content-Type": "application/json",
  //         //       },
  //         //       body: JSON.stringify(rBody),
  //         //     }
  //         //   );
  //         //   const data = await response.json();
  //         //   console.log("data fetched after setting the candidate count:", data);
  //         // }
  //       } catch (err) {
  //         console.log("err:", err);
  //       }
  //       router.push(`/test-submit-completion/${cid}`);
  //       setIsLoading(false);
  //     }
  //   } catch (err) {
  //     console.error("Failed to submit test:", err);
  //   } finally {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 7000);
  //   }
  // };

  const toggleComponent = async () => {
    setIsLoading(true);

    try {
      if (isLastQuestion) return;

      if (!isLastQuestion) {
        if (!recordingDone && recordedChunksRef.current.length === 0) {
          const silentBase64Wav =
            "UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=";
          setAnswers((prevAnswers) => {
            return prevAnswers.some(
              (ans) =>
                ans.question === newQuestions[currentQuestion - 1]?.question
            )
              ? prevAnswers
              : [
                  ...prevAnswers,
                  {
                    question: newQuestions[currentQuestion - 1]?.question,
                    answer: silentBase64Wav,
                  },
                ];
          });
          console.log("No recording made, adding silent audio blob as answer.");
          showError("No answer was provided, moving on to next question.");
          setCurrentQuestion((prevCurrent) => prevCurrent + 1);
          setIsRecording(false);
          setRecordingDone(false);
          setCompletedQuestions((prevCompleted) => [
            ...prevCompleted,
            currentQuestion,
          ]);
          if (currentQuestionIndex < newQuestions.length - 1 && hasStarted) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            speakQuestion(newQuestions[currentQuestionIndex + 1]);
            setIsFirstQues(false);
            setIsLoading(false);
          }
        } else {
          await stopAndHandleRecording();
        }
        console.log("completed questions:", completedQuestions);
        console.log("current questions:", currentQuestion);
      }
      setIsFirstQues(false);
    } catch (err) {
      console.log("ERR:", err);
    } finally {
    }
  };

  useEffect(() => {
    speakQuestion(currentQuestion);
    setTimeLeft(130);
  }, [currentQuestion]);

  const stopAndHandleRecording = async () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      await new Promise((resolve) => {
        mediaRecorderRef.current.onstop = resolve;
        mediaRecorderRef.current.stop();
      });
      setIsRecording(false);
      let blob;
      if (recordedChunksRef.current.length > 0) {
        blob = new Blob(recordedChunksRef.current, { type: "audio/wav" });
        const newAudioURL = URL.createObjectURL(blob);
        console.log("new audio url:", newAudioURL);
        recordedChunksRef.current = [];
        const base64Data = await blobToBase64(blob);
        console.log(
          "base64Data",
          base64Data,
          "=============== END OF DATA ================="
        );
        const questionBeingAnswered = currentQuestion;
        const finalData = await sendAudioToServer(base64Data);

        if (!isTranscriptionComplete) {
          return;
        }

        if (currentRecordingQuestionIndexRef.current === currentQuestion) {
          setAnswers((prev) => [
            ...prev,
            {
              question: newQuestions[currentQuestion - 1]?.question,
              answer: finalData.data.transcriptionResult,
            },
          ]);
        }
      } else {
        const silentBase64Wav =
          "UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=";
        if (currentRecordingQuestionIndexRef.current === currentQuestion) {
          setAnswers((prev) => [
            ...prev,
            {
              question: newQuestions[currentQuestion - 1]?.question,
              answer: silentBase64Wav,
            },
          ]);
        }
      }
      setIsLoading(false);
    } else {
      console.error("Recorder not active or already stopped.");
    }
    recordedChunksRef.current = [];
  };

  // async function sendAudioToServer(base64Data) {
  //   try {
  //     setIsLoading(true);
  //     setIsTranscriptionComplete(true);
  //     console.log("send audio to server:", base64Data);
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_REMOTE_URL}/speech-to-text`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ audio: base64Data }),
  //       }
  //     );
  //     const data = await response.json();
  //     console.log("audio response:", data.data.transcriptionResult);
  //     setIsTranscriptionComplete(false);
  //     setCurrentQuestion((prevCurrent) => prevCurrent + 1);
  //     console.log("currentQuestion State:", currentQuestion);
  //     setIsRecording(false);
  //     setRecordingDone(false);
  //     setCompletedQuestions((prevCompleted) => [
  //       ...prevCompleted,
  //       currentQuestion,
  //     ]);
  //     if (currentQuestionIndex < newQuestions.length - 1) {
  //       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  //       console.log(
  //         "currentQuestion State inside if condition:",
  //         currentQuestion
  //       );
  //       console.log(
  //         console.log("state of currentQuestionIndex:", currentQuestionIndex)
  //       );
  //       setIsLoading(false);
  //     }
  //     setAnswers((prev) => [
  //       ...prev,
  //       {
  //         question: newQuestions[currentQuestion - 1]?.question,
  //         answer: data?.data?.transcriptionResult,
  //       },
  //     ]);
  //     return data;
  //   } catch (error) {
  //     console.error("Error sending audio to server:", error);
  //     return "Error in transcription";
  //   }
  // }

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result.split(",")[1];
        console.log("Converted Base64 Length:", base64data.length);
        resolve(base64data);
      };
      reader.onerror = reject;
    });
  }

  useEffect(() => {
    if (currentQuestionIndex < newQuestions?.length && hasStarted) {
      speakQuestion(newQuestions[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, newQuestions, hasStarted]);

  const showError = (message) => {
    setMessage(message);
    setShowErrorMessage(true);

    setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000);
  };

  const removeNumericPrefix = (question) => {
    return question.substring(2);
  };

  return (
    <>
      <div className={styles.container}>
        {/*top container*/}
        {isLoading ? (
          <>
            <div className={styles.loader}></div>
            {isGeneratingResult && (
              <div className={styles.generatingResultText}>
                Please wait, it might take some time, AI is generating your
                result.
              </div>
            )}
          </>
        ) : (
          <>
            {showErrorMessage && (
              <ErrorIndicator
                showErrorMessage={showErrorMessage}
                msgText={message}
              />
            )}
            <div className={styles.topContainer}>
              <div className={styles.questionNoList}>
                <ul>
                  {newQuestions?.map((question, index) => {
                    return (
                      <>
                        <li
                          key={question.question_id}
                          style={{
                            backgroundColor:
                              currentQuestion === question.question_id
                                ? "#6137db"
                                : "#f0edfc",
                            color:
                              currentQuestion === question.question_id
                                ? "white"
                                : "black",
                          }}
                        >
                          {question.question_id}
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
              <span>
                {" "}
                <Image src="/timer.svg" width={20} height={20} />
                {minutes}:
                {remainingSeconds < 10
                  ? `0${remainingSeconds}`
                  : remainingSeconds}
              </span>
            </div>
            {/* Recording Popup */}
            {/* {isRecordingPopupVisible && ( */}
            {isRecording && (
              <div className={styles.recordingPopup}>
                Recording in progress...
              </div>
            )}

            {/* question container */}

            <div className={styles.questionContainer}>
              {newQuestions && newQuestions?.length > 0 && (
                <span>
                  {isFirstQues
                    ? removeNumericPrefix(
                        newQuestions[currentQuestion - 1]?.question,
                      )
                    : newQuestions[currentQuestion - 1]?.question}
                </span>
              )}
            </div>
            {/*Record button */}

            <button
              style={{
                borderColor: recordingDone ? "#808080" : "",
                color: recordingDone ? "#808080" : "",
              }}
              className={styles.recordBtn}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isRecording}
            >
              <Image
                src={recordingDone ? "/mic-disabled.svg" : "/mic.svg"}
                width={20}
                height={20}
              />
              {isRecording
                ? "Click To Record Answer"
                : "Click To Record Answer"}
            </button>
            {/*lower container */}
            <div className={styles.lowerContainer}>
              <button
                //onClick={isLastQuestion ? submitTestHandler : toggleComponent}
                disabled={!recordingDone || isSubmitted || isLoading}
              >
                {isLastQuestion ? "Submit Test" : "Next Question"}
                <Image src="/Forward.svg" width={20} height={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default QuestionBox;
