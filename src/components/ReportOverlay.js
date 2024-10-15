import { useEffect, useRef, useState } from "react";
// import { format, isValid, parseISO } from "date-fns";
import gsap from "gsap";
import Image from "next/image";
import Assessment from "@/components/Assessment";
import ErrorIndicator from "./ErrorIndicator";
import styles from "@/styles/ReportOverlay.module.css";
import downloadIcon from "../../public/icons/download.svg";
import candidateImage from "../../public/avatars/avatar-3.svg";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
import generatePDF from "@/utils/generatePDF";
import ButtonBack from "./ButtonBack";

const isValidDate = (date) => {
  const parsedDate = Date.parse(date);
  return !isNaN(parsedDate);
};

const ReportOverlay = ({ onClose, reportOverlay, selectedCandidate }) => {
  // console.log("selected candidate is:", selectedCandidate);
  // console.log(
  //   "selected candidate is this:",
  //   selectedCandidate?.result?.softskillRating,
  // );
  // console.log("//////////////////////////", selectedCandidate?.result);
  const [codingResult, setCodingResult] = useState();
  const [isCodingAssessment, setIsCodingAssessment] = useState(false);
  const [results, setResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [error, setError] = useState(false);

  const candidateDate = selectedCandidate?.date;
  const resultDate = results?.data?.createdAt;

  const displayDate = isValidDate(candidateDate)
    ? candidateDate
    : isValidDate(resultDate)
      ? resultDate
      : null;

  useEffect(() => {
    async function fetchCandidatesCodingResult() {
      setIsLoading(true);
      const requestBody = {
        candidate_id: selectedCandidate?.candidate_id,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/coding-results/customer/${selectedCandidate?.customer?.customer_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(requestBody),
        },
      );

      const data = await response.json();
      console.log("data response:", data);
      setCodingResult(data);
      //
      setIsLoading(false);
      if (data && data?.data && data?.data?.result) {
        setIsCodingAssessment(true);
      } else {
        setIsCodingAssessment(false);
      }
    }
    fetchCandidatesCodingResult();
  }, [selectedCandidate]);

  const calculateCumulativeMean = (val1, val2, val3) => {
    let total = 0;
    let count = 0;

    if (val1) {
      total += parseFloat(val1);
      count += 1;
    }

    if (val2) {
      total += parseFloat(val2);
      count += 1;
    }

    if (val3) {
      total += parseFloat(val3);
      count += 1;
    }

    if (count === 0) return 0;

    return (total / count).toFixed(1); // Round the final result to one decimal place
  };

  const overlayRef = useRef(null);
  const overlayRef1 = useRef(null);
  const contentRef = useRef(null);
  const infoSymbolSize = 10;

  const headingOne = "Technical";
  const headingTwo = "Soft-skill";
  const headingThree = "Coding Exercise Analysis";

  const getBackgroundColor = (score) => {
    const roundedScore = Math.round(score);
    if (roundedScore >= 7 && roundedScore <= 10) {
      return "#E7FFE0";
    } else if (roundedScore >= 5 && roundedScore < 7) {
      // Ensure the range is correct
      return "#F0F3FF";
    } else {
      return "#FFE6E6";
    }
  };

  const getFilter = (score) => {
    const roundedScore = Math.round(score);

    if (roundedScore >= 7 && roundedScore <= 10) {
      return "Recommended";
    } else if (roundedScore >= 5 && roundedScore < 7) {
      // Ensure the range is correct
      return "Qualified";
    } else {
      return "Not Eligible";
    }
  };

  const getStatusSymbol = (score) => {
    const roundedScore = Math.round(score);

    if (roundedScore >= 7 && roundedScore <= 10) {
      return "/activeStatus.svg";
    } else if (roundedScore >= 5 && roundedScore < 7) {
      // Ensure the range is correct
      return "/qualified.svg";
    } else {
      return "/noteligible.svg";
    }
  };

  // useEffect(() => {
  //   async function fetchAllCandidateReports() {
  //     const requestBody = {
  //       candidate_id: selectedCandidate?.candidate_id,
  //     };
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_REMOTE_URL}/result-by-cand-id`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(requestBody),
  //       },
  //     );

  //     console.log("response: ", response);
  //     if (!response.ok) {
  //       console.log(`Error: ${response.status}`);
  //     }
  //     const allData = await response.json();
  //     setResults(allData);

  //     console.log("jsonified candidates response: ", allData);
  //   }
  //   fetchAllCandidateReports();
  // }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (reportOverlay) {
      gsap.to(overlayRef.current, {
        y: "0%",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(overlayRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose,
      });
    }

    return () => {
      gsap.to(overlayRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.1,
        ease: "power1",
      });
    };
  }, [reportOverlay, onClose]);

  return (
    <>
      {error ? (
        <ErrorIndicator
          showErrorMessage={error}
          msgText={"Could not download the report, try again."}
        />
      ) : null}
      <div ref={overlayRef} className={styles.parent}>
        <div className={styles.btn}>
          <button onClick={onClose}>
            <Image src="/shut.svg" width={15} height={15} />
          </button>
        </div>
        <div
          className={`${styles.superContainer} content-to-print`}
          id="content-to-print"
        >
          <div className={styles.coverContainer}>
            <div className={styles.topContainer}>
              <div className={styles.avatarContainer}>
                <Image src="/avatars/avatar-3.svg" width={65} height={84} />
              </div>
              <div className={styles.information}>
                <h1>{selectedCandidate?.name}</h1>
                <p className={styles.role}>{selectedCandidate?.position}</p>
                <h4
                  style={{
                    backgroundColor: getBackgroundColor(
                      parseFloat(
                        calculateCumulativeMean(
                          selectedCandidate?.result?.technicalRating,
                          selectedCandidate?.result?.softskillRating,
                          codingResult?.data?.result?.technicalRating,
                        ),
                      ),
                    ),
                  }}
                >
                  {getFilter(
                    parseFloat(
                      calculateCumulativeMean(
                        selectedCandidate?.result?.technicalRating,
                        selectedCandidate?.result?.softskillRating,
                        codingResult?.data?.result?.technicalRating,
                      ),
                    ),
                  )}
                  <Image
                    src={getStatusSymbol(
                      parseFloat(
                        calculateCumulativeMean(
                          selectedCandidate?.result?.technicalRating,
                          selectedCandidate?.result?.softskillRating,
                          codingResult?.data?.result?.technicalRating,
                        ),
                      ),
                    )}
                    width={infoSymbolSize}
                    height={infoSymbolSize}
                  />
                </h4>
              </div>
              <div className={styles.rightContainer}>
                <span
                  style={{
                    backgroundColor: getBackgroundColor(
                      Math.round(
                        calculateCumulativeMean(
                          selectedCandidate?.result?.technicalRating,
                          selectedCandidate?.result?.softskillRating,
                        ),
                      ),
                    ),
                  }}
                >
                  {Math.round(
                    calculateCumulativeMean(
                      selectedCandidate?.result?.technicalRating,
                      selectedCandidate?.result?.softskillRating,
                    ),
                  )}
                  /10
                </span>
              </div>
            </div>
            {/* candidate test info div */}
            <div className={styles.infoContainer} ref={contentRef}>
              <div className={styles.infoDiv}>
                <ul>
                  <li>
                    <span className={styles.bold}>Name: </span>
                    <span>{selectedCandidate?.customer?.name}</span>
                  </li>
                  <li>
                    <span className={styles.bold}>Phone: </span>
                    <span>
                      {selectedCandidate?.contactNo ||
                      selectedCandidate?.contact_no
                        ? selectedCandidate?.contactNo ||
                          selectedCandidate?.contact_no
                        : "+92 333 3333333"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.bold}>Date: </span>
                    {/* <span>
                      {selectedCandidate?.date || results?.data?.createdAt
                        ? selectedCandidate?.date || results?.data?.createdAt
                        : selectedCandidate?.date || results?.data?.createdAt}
                    </span> */}
                    <span>
                      {/* {format(new Date(2014, 1, 11), "EEE, yyyy-MM-dd")} */}

                      {selectedCandidate?.date || results?.data?.createdAt
                        ? // format(
                          // displayDate
                          selectedCandidate?.date || results?.data?.createdAt
                        : // new Date(
                          //   selectedCandidate?.date ||
                          //     results?.data?.createdAt
                          // ),
                          // "EEE, MMM dd yyyy"
                          // )
                          selectedCandidate?.date || results?.data?.createdAt}
                    </span>
                  </li>
                  <li>
                    <span className={styles.bold}>Job Type: </span>
                    <span>
                      {selectedCandidate?.customer?.jobType ||
                        selectedCandidate?.job_type}
                    </span>
                  </li>
                  <li>
                    <span className={styles.bold}>Applied For: </span>
                    <span>
                      {selectedCandidate?.company
                        ? selectedCandidate?.company?.name
                        : "Self"}
                    </span>
                  </li>
                  <li>
                    <span className={styles.bold}>Email: </span>
                    <span>{selectedCandidate?.customer?.email}</span>
                  </li>
                </ul>
              </div>
              {/*assessment components */}
              <div className={styles.cont}>
                <div className={styles.auto}>
                  <Assessment
                    heading={headingOne}
                    para={
                      selectedCandidate?.result?.technicalAssessment ||
                      results?.data?.result?.technicalAssessment
                    }
                    score={
                      selectedCandidate?.result?.technicalRating.toString() ||
                      results?.data?.result?.technicalRating
                    }
                  />
                  <Assessment
                    heading={headingTwo}
                    para={
                      selectedCandidate?.result?.softskillAssessment ||
                      results?.data?.result?.softskillAssessment
                    }
                    score={
                      selectedCandidate?.result?.softskillRating.toString() ||
                      results?.data?.result?.softskillRating
                    }
                  />
                  {isCodingAssessment && (
                    <>
                      <Assessment
                        heading={headingThree}
                        para={codingResult?.data?.result?.technicalSummary}
                        score={Math.round(
                          parseInt(codingResult?.data?.result?.technicalRating),
                        )}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.selfReportOverlayButtons}>
              {/* <button className={styles.backButton} onClick={onClose}>
                <span>
                  <Image
                    alt="Back arrow"
                    height={40}
                    width={40}
                    src="/backBlack.svg"
                  />
                </span>
                Back
              </button> */}
              <ButtonBack onClick={onClose}>Back</ButtonBack>
              {!isLoading && (
                <button
                  className={styles.downloadButton}
                  // onClick={handleDownloadPdf}
                  onClick={() =>
                    generatePDF({
                      setIsPdfLoading: setIsPdfLoading,
                      selectedCandidate,
                      technicalRating:selectedCandidate?.result?.technicalRating,
                      technicalSummary: selectedCandidate?.result?.technicalAssessment,
                      softSkillSummary: selectedCandidate?.result?.softskillAssessment,
                      softSkillRating: selectedCandidate?.result?.softskillRating,
                      codingSummary: codingResult?.data?.result?.technicalSummary,
                      codingRating: codingResult?.data?.result?.technicalRating
                    })
                  }
                  disabled={isPdfLoading}
                >
                  {isPdfLoading ? "Downloading..." : "Download PDF"}
                  <span>
                    {isPdfLoading ? (
                      <div className={styles.loaderSmall}></div>
                    ) : (
                      <Image
                        alt="Download icon"
                        height={35}
                        width={35}
                        src={downloadIcon}
                      />
                    )}
                  </span>
                </button>
              )}
              {isLoading && <div className={styles.loader}> </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReportOverlay;
