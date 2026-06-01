"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#593AE3";

const pageVariants = {
  initial: { y: 300, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 32,
      duration: 0.4,
    },
  },
  exit: {
    y: -300,
    opacity: 0,
    transition: { duration: 0.25 },
  },
};

const stepVariants = {
  enter: (direction) => ({
    y: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 32,
      duration: 0.4,
    },
  },
  exit: (direction) => ({
    y: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.25 },
  }),
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.15, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const ENGAGEMENT_OPTIONS = [
  { label: "Full-time Engagement", description: "40 hours/week commitment" },
  { label: "Part-time Engagement", description: "20-30 hours/week" },
  { label: "Contract Based", description: "Fixed duration project" },
  { label: "Project Based", description: "Specific deliverables" },
  { label: "Hourly Rate", description: "Flexible hours" },
];

const DURATION_OPTIONS = [
  "Less than 1 month",
  "1-3 months",
  "3-6 months",
  "6-12 months",
  "More than 1 year",
  "Not sure yet",
];

const TEAM_SIZE_OPTIONS = [
  "Just me",
  "2-5 people",
  "6-10 people",
  "11-25 people",
  "26-50 people",
  "50+ people",
];

const BUDGET_RANGE_OPTIONS = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000+",
  "Prefer not to say",
];

const START_DATE_OPTIONS = [
  "Immediately",
  "Within 1 week",
  "Within 2 weeks",
  "Within 1 month",
  "1-3 months",
  "Not decided yet",
];

export default function BookTalentFlow() {
  const router = useRouter();
  const params = useParams();
  const candidateId = params?.candidateId;

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Step 1: Engagement Type
  const [engagementType, setEngagementType] = useState([]);
  const [otherOpen, setOtherOpen] = useState(false);
  const [otherText, setOtherText] = useState("");
  const [otherCommitted, setOtherCommitted] = useState(false);

  // Step 2: Project Duration
  const [duration, setDuration] = useState("");

  // Step 3: Team Size
  const [teamSize, setTeamSize] = useState("");

  // Step 4: Budget Range
  const [budgetRange, setBudgetRange] = useState("");

  // Step 5: Start Date
  const [startDate, setStartDate] = useState("");

  // Step 6: Contact Info
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Step 7: Additional Details
  const [projectDescription, setProjectDescription] = useState("");

  // Step 8: Discovery
  const DISCOVERY_OPTIONS = [
    "LinkedIn",
    "Company Website",
    "Email",
    "Referral",
    "Social Media",
    "Search Engine",
    "Other",
  ];
  const [discovery, setDiscovery] = useState("");
  const [discoveryOther, setDiscoveryOther] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      setIsPageLoaded(true);
    }, 500);

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Please enter a valid email address";
    return "";
  };

  const validatePhone = (value) => {
    if (!value || value.trim() === "") return "";
    if (value.replace(/\D/g, "").length < 10) return "Enter a valid phone number";
    return "";
  };

  const handleNameChange = (e) => {
    const v = e.target.value;
    setFullName(v);
    setNameError(validateName(v));
  };

  const handleEmailChange = (e) => {
    const v = e.target.value;
    setEmail(v);
    setEmailError(validateEmail(v));
  };

  const handlePhoneChange = (e) => {
    const v = e.target.value;
    setPhone(v);
    setPhoneError(validatePhone(v));
  };

  const toggleEngagement = (type) => {
    setEngagementType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const addOther = () => {
    const value = otherText.trim();
    if (!value) return;
    if (!engagementType.includes(value))
      setEngagementType((prev) => [...prev, value]);
    setOtherCommitted(true);
  };

  // Validation for each step
  const isStep1Valid = engagementType.length > 0;
  const isStep2Valid = duration !== "";
  const isStep3Valid = teamSize !== "";
  const isStep4Valid = budgetRange !== "";
  const isStep5Valid = startDate !== "";
  const isStep6Valid =
    fullName.trim().length > 1 &&
    !validateName(fullName) &&
    email.trim().length > 0 &&
    !validateEmail(email) &&
    (phone.trim().length === 0 || !validatePhone(phone));
  const isStep7Valid = projectDescription.trim().length >= 20;
  const isStep8Valid =
    discovery !== "" && (discovery !== "Other" || discoveryOther.trim() !== "");

  const progressPct = useMemo(() => {
    const totalSteps = 8;
    return (step / totalSteps) * 100;
  }, [step]);

  const next = () => {
    if (step === 1 && !isStep1Valid) return;
    if (step === 2 && !isStep2Valid) return;
    if (step === 3 && !isStep3Valid) return;
    if (step === 4 && !isStep4Valid) return;
    if (step === 5 && !isStep5Valid) return;
    if (step === 6 && !isStep6Valid) return;
    if (step === 7 && !isStep7Valid) return;

    setDirection(1);
    setStep((s) => (s === 8 ? 8 : s + 1));
  };

  const handleBack = () => {
    if (step === 1) {
      router.back();
    } else {
      setDirection(-1);
      setStep((s) => (s === 1 ? 1 : s - 1));
    }
  };

  const handleDiscoverySelect = (option) => {
    setDiscovery(option);
    if (option !== "Other") {
      setDiscoveryOther("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStep8Valid) return;
    setSubmitting(true);
    try {
      const finalDiscovery = discovery === "Other" ? discoveryOther : discovery;
      const submissionData = {
        candidate_id: candidateId,
        client_name: fullName,
        company_name: companyName,
        email,
        phone_number: phone,
        engagement_type: engagementType,
        duration,
        team_size: teamSize,
        budget_range: budgetRange,
        start_date: startDate,
        project_description: projectDescription,
        discovery: finalDiscovery,
      };

      // Make POST request to backend
      const url = `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/client-hire-candidate`;
      console.log("Sending hiring request to:", url);
      console.log("Request data:", submissionData);
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit hiring request");
      }

      console.log("Success:", result);
      // Redirect only on success
      router.push(`/profile/${candidateId}?success=true`);
    } catch (error) {
      console.error("Error submitting hiring request:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-white">
      <AnimatePresence>
        <motion.div
          key="overlay"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          className="fixed inset-0 z-40 "
          style={{ pointerEvents: "auto" }}
        />

        <motion.div
          key="page-content"
          initial="initial"
          animate={isPageLoaded ? "animate" : "initial"}
          variants={pageVariants}
          className="relative z-40 min-h-screen"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
          }}
        >
          {/* Top bar */}
          <div
            className="fixed z-50 top-0 left-0 w-full flex flex-col items-end"
            style={{
              background: `linear-gradient(90deg, #F6F4FC 10%, #E5E3F2 28%, #FFFFFF 50%, #E5E3F2 72%, #F6F4FC 90%)`,
              padding: "0.2px 0",
            }}
          >
            <button
              type="button"
              onClick={() => router.back()}
              className="mr-5 mt-2.5 mb-2.5 p-1 bg-transparent rounded-full border-2 border-grey-primary-tint-80 hover:bg-grey-primary-tint-90 focus:outline-none transition-colors shadow-sm cursor-pointer"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" fill="none" />
                <path
                  d="M8 8l8 8M16 8l-8 8"
                  stroke="#4A525D"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Progress bar with step indicator */}
          <div
            className="fixed z-50 left-0 w-full overflow-hidden"
            style={{ top: 48 }}
          >
            <div className="h-[7.5px] w-full bg-grey-primary-tint-70 overflow-hidden">
              <div
                className="h-[7.5px] transition-all duration-500"
                style={{ width: `${progressPct}%`, backgroundColor: ACCENT }}
              />
            </div>

            {/* Step counter - moved to right */}
            <div className="flex justify-end mt-4 pr-6">
              <span className="text-sm text-grey-primary font-medium">
                Step {step} of 8
              </span>
            </div>

            {step > 1 && (
              <div className="mt-4 ml-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 text-grey-primary-shade-20 hover:text-primary-tint-10 focus:outline-none cursor-pointer transition-transform hover:-translate-x-0.5"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M8 12H21"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 12l5-5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 12l5 5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-lg font-medium tracking-wide">Back</span>
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="relative z-40 flex items-center justify-center px-2 sm:px-0 pt-20 pb-10 h-screen overflow-y-auto">
            <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl relative">
              <div className="relative w-full pt-10 sm:pt-12">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 32,
                      duration: 0.4,
                    }}
                  >
                    {/* Step 1: Engagement Type */}
                    {step === 1 && (
                      <div className="flex flex-col justify-center">
                        <div className="mb-2">
                          <span className="inline-block px-3 py-1 bg-primary-tint-90 text-primary-tint-10 rounded-full text-sm font-medium">
                            Project Details
                          </span>
                        </div>
                        <h1
                          className="mb-4 text-grey-primary-shade-90"
                          style={{
                            fontSize: "2.1rem",
                            fontWeight: 500,
                            textAlign: "left",
                            letterSpacing: "-0.01em",
                            lineHeight: "1.15",
                          }}
                        >
                          What type of engagement are you looking for?{" "}
                          <span
                            style={{
                              color:'text-grey-primary-shade-90',
                              fontSize: "2.1rem",
                              verticalAlign: "super",
                            }}
                          >
                            *
                          </span>
                        </h1>
                        <p className="mb-8 text-grey-primary-shade-80 text-lg">
                          Select all that apply to your project needs
                        </p>

                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                          {ENGAGEMENT_OPTIONS.map((item) => (
                            <motion.button
                              key={item.label}
                              type="button"
                              onClick={() => toggleEngagement(item.label)}
                              className={`w-full min-h-[80px] rounded-xl border-2 p-5 text-left transition-all ${
                                engagementType.includes(item.label)
                                  ? "border-primary-tint-10 bg-neutral-white shadow-md"
                                  : "border-grey-primary-tint-80 bg-grey-primary-tint-90 hover:border-grey-primary-tint-70 hover:shadow-sm"
                              } focus:outline-none cursor-pointer`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-start gap-4">
                                <div
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                    engagementType.includes(item.label)
                                      ? "border-primary-tint-10 bg-primary-tint-10"
                                      : "border-grey-primary-tint-70"
                                  }`}
                                >
                                  {engagementType.includes(item.label) && (
                                    <svg
                                      className="w-3.5 h-3.5 text-white"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="text-grey-primary-shade-10 font-semibold text-lg">
                                    {item.label}
                                  </div>
                                  <div className="text-grey-primary text-sm mt-1">
                                    {item.description}
                                  </div>
                                </div>
                              </div>
                            </motion.button>
                          ))}

                          {/* Other card */}
                          <div
                            className={`w-full min-h-[80px] rounded-xl border-2 p-5 text-left transition-all cursor-pointer ${
                              otherCommitted || otherOpen
                                ? "border-primary-tint-10 bg-neutral-white"
                                : "border-grey-primary-tint-80 bg-grey-primary-tint-90 hover:border-grey-primary-tint-70"
                            }`}
                            onClick={() => {
                              if (!otherCommitted && !otherOpen) {
                                setOtherOpen(true);
                              }
                            }}
                          >
                            {!otherCommitted ? (
                              <>
                                {otherOpen ? (
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={otherText}
                                      onChange={(e) => setOtherText(e.target.value)}
                                      placeholder="Type engagement type"
                                      className="flex-1 rounded-lg px-3 py-2 text-grey-primary-shade-10 placeholder-grey-primary-tint-70 border bg-neutral-white border-grey-primary-tint-70 focus:ring-2 focus:ring-primary-tint-10 focus:border-primary-tint-10"
                                      autoFocus
                                    />
                                    <button
                                      type="button"
                                      onClick={addOther}
                                      disabled={!otherText.trim()}
                                      className={`px-4 py-2 rounded-lg font-semibold cursor-pointer transition ${
                                        otherText.trim()
                                          ? "bg-primary-tint-10 text-white hover:opacity-90"
                                          : "bg-grey-primary-tint-70 text-grey-primary cursor-not-allowed"
                                      }`}
                                    >
                                      Add
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full border-2 border-grey-primary-tint-70 flex items-center justify-center">
                                      <span className="text-grey-primary-tint-70 text-xl font-light">
                                        +
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => setOtherOpen(true)}
                                      className="text-grey-primary-shade-10 font-semibold text-lg w-full text-left cursor-pointer"
                                    >
                                      Other (Specify)
                                    </button>
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center border-primary-tint-10 bg-primary-tint-10 flex-shrink-0 mt-0.5">
                                  <svg
                                    className="w-3.5 h-3.5 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <div className="text-grey-primary-shade-10 font-semibold text-lg truncate">
                                    {otherText}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-8 flex items-center justify-end">
                          <button
                            type="button"
                            onClick={next}
                            disabled={!isStep1Valid}
                            className={`flex items-center justify-center gap-2 text-xl px-10 py-4 rounded-lg font-semibold text-neutral-white transition-all disabled:opacity-50 ${
                              isStep1Valid
                                ? "bg-primary-tint-10 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                                : "bg-grey-primary-tint-70 cursor-not-allowed"
                            }`}
                          >
                            <span>Continue</span>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M16 12H3"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16 12l-5-5"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16 12l-5 5"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Project Duration */}
                    {step === 2 && (
                      <div className="flex flex-col justify-center pt-10">
                        <div className="mb-2">
                          <span className="inline-block px-3 py-1 bg-primary-tint-90 text-primary-tint-10 rounded-full text-sm font-medium">
                            Timeline
                          </span>
                        </div>
                        <h2
                          className="mb-4 text-grey-primary-shade-90"
                          style={{
                            fontSize: "2.1rem",
                            fontWeight: 500,
                            textAlign: "left",
                            letterSpacing: "-0.01em",
                            lineHeight: "1.15",
                          }}
                        >
                          How long do you need the talent for?{" "}
                          <span
                            style={{
                              color: 'text-grey-primary-shade-90',
                              fontSize: "2.1rem",
                              verticalAlign: "super",
                            }}
                          >
                            *
                          </span>
                        </h2>
                        <p className="mb-8 text-grey-primary-shade-80 text-lg">
                          This helps us match you with the right professionals
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {DURATION_OPTIONS.map((option) => (
                            <motion.button
                              key={option}
                              type="button"
                              onClick={() => setDuration(option)}
                              className={`p-6 rounded-xl border-2 text-left transition-all ${
                                duration === option
                                  ? "border-primary-tint-10 bg-neutral-white shadow-md"
                                  : "border-grey-primary-tint-80 bg-grey-primary-tint-90 hover:border-grey-primary-tint-70 hover:shadow-sm"
                              } cursor-pointer`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="text-grey-primary-shade-10 font-semibold text-base">
                                {option}
                              </div>
                              <div
                                className="mt-3 h-1 w-12 rounded-full transition-colors"
                                style={{
                                  backgroundColor:
                                    duration === option ? ACCENT : "#E5E3F2",
                                }}
                              />
                            </motion.button>
                          ))}
                        </div>

                        <div className="mt-8 flex items-center justify-end">
                          <button
                            type="button"
                            onClick={next}
                            disabled={!isStep2Valid}
                            className={`flex items-center justify-center gap-2 text-xl px-10 py-4 rounded-lg font-semibold text-neutral-white transition-all disabled:opacity-50 ${
                              isStep2Valid
                                ? "bg-primary-tint-10 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                                : "bg-grey-primary-tint-70 cursor-not-allowed"
                            }`}
                          >
                            <span>Continue</span>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M16 12H3"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16 12l-5-5"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16 12l-5 5"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Team Size */}
                    {step === 3 && (
                      <div className="flex flex-col justify-center mt-10">
                        <div className="mb-2">
                          <span className="inline-block px-3 py-1 bg-primary-tint-90 text-primary-tint-10 rounded-full text-sm font-medium">
                            Team Info
                          </span>
                        </div>
                        <h2
                          className="mb-4 text-grey-primary-shade-90"
                          style={{
                            fontSize: "2.1rem",
                            fontWeight: 500,
                            textAlign: "left",
                            letterSpacing: "-0.01em",
                            lineHeight: "1.15",
                          }}
                        >
                          What&apos;s your current team size?{" "}
                          <span
                            style={{
                              color: 'text-grey-primary-shade-90',
                              fontSize: "2.1rem",
                              verticalAlign: "super",
                            }}
                          >
                            *
                          </span>
                        </h2>
                        <p className="mb-8 text-grey-primary-shade-80 text-lg">
                          Understanding your team helps us find the perfect fit
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {TEAM_SIZE_OPTIONS.map((option) => (
                            <motion.button
                              key={option}
                              type="button"
                              onClick={() => setTeamSize(option)}
                              className={`p-6 rounded-xl border-2 text-center transition-all ${
                                teamSize === option
                                  ? "border-primary-tint-10 bg-neutral-white shadow-md"
                                  : "border-grey-primary-tint-80 bg-grey-primary-tint-90 hover:border-grey-primary-tint-70 hover:shadow-sm"
                              } cursor-pointer`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="text-grey-primary-shade-10 font-semibold text-base">
                                {option}
                              </div>
                              <div
                                className="mt-3 h-1 w-12 rounded-full mx-auto transition-colors"
                                style={{
                                  backgroundColor:
                                    teamSize === option ? ACCENT : "#E5E3F2",
                                }}
                              />
                            </motion.button>
                          ))}
                        </div>

                        <div className="mt-8 flex items-center justify-end">
                          <button
                            type="button"
                            onClick={next}
                            disabled={!isStep3Valid}
                            className={`flex items-center justify-center gap-2 text-xl px-10 py-4 rounded-lg font-semibold text-neutral-white transition-all disabled:opacity-50 ${
                              isStep3Valid
                                ? "bg-primary-tint-10 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                                : "bg-grey-primary-tint-70 cursor-not-allowed"
                            }`}
                          >
                            <span>Continue</span>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M16 12H3"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16 12l-5-5"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16 12l-5 5"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Budget Range */}
                    {step === 4 && (
                      <div className="flex flex-col justify-center mt-48">
                        <div className="mb-2">
                          <span className="inline-block px-3 py-1 bg-primary-tint-90 text-primary-tint-10 rounded-full text-sm font-medium">
                            Budget
                          </span>
                        </div>
                        <h2
                          className="mb-4 text-grey-primary-shade-90"
                          style={{
                            fontSize: "2.1rem",
                            fontWeight: 500,
                            textAlign: "left",
                            letterSpacing: "-0.01em",
                            lineHeight: "1.15",
                          }}
                        >
                          What&apos;s your estimated budget?{" "}
                          <span
                            style={{
                              color: 'text-grey-primary-shade-90',
                              fontSize: "2.1rem",
                              verticalAlign: "super",
                            }}
                          >
                            *
                          </span>
                        </h2>
                        <p className="mb-8 text-grey-primary-shade-80 text-lg">
                          This information is kept confidential and helps us recommend suitable options
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {BUDGET_RANGE_OPTIONS.map((option) => (
                            <motion.button
                              key={option}
                              type="button"
                              onClick={() => setBudgetRange(option)}
                              className={`p-6 rounded-xl border-2 text-left transition-all ${
                                budgetRange === option
                                  ? "border-primary-tint-10 bg-neutral-white shadow-md"
                                  : "border-grey-primary-tint-80 bg-grey-primary-tint-90 hover:border-grey-primary-tint-70 hover:shadow-sm"
                              } cursor-pointer`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="text-grey-primary-shade-10 font-semibold text-base">
                                {option}
                              </div>
                              <div
                                className="mt-3 h-1 w-12 rounded-full transition-colors"
                                style={{
                                  backgroundColor:
                                    budgetRange === option ? ACCENT : "#E5E3F2",
                                }}
                              />
                            </motion.button>
                          ))}
                        </div>

                        <div className="mt-8 flex items-center justify-end">
                          <button
                            type="button"
                            onClick={next}
                            disabled={!isStep4Valid}
                            className={`flex items-center justify-center gap-2 text-xl px-10 py-4 rounded-lg font-semibold text-neutral-white transition-all disabled:opacity-50 ${
                              isStep4Valid
                                ? "bg-primary-tint-10 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                                : "bg-grey-primary-tint-70 cursor-not-allowed"
                            }`}
                          >
                            <span>Continue</span>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M16 12H3"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16 12l-5-5"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16 12l-5 5"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 5: Start Date */}
                    {step === 5 && (
                      <div className="flex flex-col justify-center">
                        <div className="mb-2">
                          <span className="inline-block px-3 py-1 bg-primary-tint-90 text-primary-tint-10 rounded-full text-sm font-medium">
                            Timeline
                          </span>
                        </div>
                        <h2
                          className="mb-4 text-grey-primary-shade-90"
                          style={{
                            fontSize: "2.1rem",
                            fontWeight: 500,
                            textAlign: "left",
                            letterSpacing: "-0.01em",
                            lineHeight: "1.15",
                          }}
                        >
                          When would you like to start?{" "}
                          <span
                            style={{
                              color: 'text-grey-primary-shade-90',
                              fontSize: "2.1rem",
                              verticalAlign: "super",
                            }}
                          >
                            *
                          </span>
                        </h2>
                        <p className="mb-8 text-grey-primary-shade-80 text-lg">
                          Let us know your preferred start date for this engagement
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {START_DATE_OPTIONS.map((option) => (
                            <motion.button
                              key={option}
                              type="button"
                              onClick={() => setStartDate(option)}
                              className={`p-6 rounded-xl border-2 text-left transition-all ${
                                startDate === option
                                  ? "border-primary-tint-10 bg-neutral-white shadow-md"
                                  : "border-grey-primary-tint-80 bg-grey-primary-tint-90 hover:border-grey-primary-tint-70 hover:shadow-sm"
                              } cursor-pointer`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="text-grey-primary-shade-10 font-semibold text-base">
                                {option}
                              </div>
                              <div
                                className="mt-3 h-1 w-12 rounded-full transition-colors"
                                style={{
                                  backgroundColor:
                                    startDate === option ? ACCENT : "#E5E3F2",
                                }}
                              />
                            </motion.button>
                          ))}
                        </div>

                        <div className="mt-8 flex items-center justify-end">
                          <button
                            type="button"
                            onClick={next}
                            disabled={!isStep5Valid}
                            className={`flex items-center justify-center gap-2 text-xl px-10 py-4 rounded-lg font-semibold text-neutral-white transition-all disabled:opacity-50 ${
                              isStep5Valid
                                ? "bg-primary-tint-10 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                                : "bg-grey-primary-tint-70 cursor-not-allowed"
                            }`}
                          >
                            <span>Continue</span>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M16 12H3"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16 12l-5-5"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16 12l-5 5"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 6: Contact Information */}
                    {step === 6 && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (isStep6Valid) next();
                        }}
                        className="flex flex-col justify-center"
                      >
                        <div className="mb-2">
                          <span className="inline-block px-3 py-1 bg-primary-tint-90 text-primary-tint-10 rounded-full text-sm font-medium">
                            Contact Details
                          </span>
                        </div>
                        <h2
                          className="mb-4 text-grey-primary-shade-90"
                          style={{
                            fontSize: "2.1rem",
                            fontWeight: 500,
                            textAlign: "left",
                            letterSpacing: "-0.01em",
                            lineHeight: "1.15",
                          }}
                        >
                          How can we reach you?{" "}
                          <span
                            style={{
                              color: 'text-grey-primary-shade-90',
                              fontSize: "2.1rem",
                              verticalAlign: "super",
                            }}
                          >
                            *
                          </span>
                        </h2>
                        <p className="mb-8 text-grey-primary-shade-80 text-lg">
                          We&apos;ll use this to send you candidate recommendations
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="text-grey-primary-shade-10 block font-medium mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={fullName}
                              onChange={handleNameChange}
                              onBlur={() => setNameError(validateName(fullName))}
                              placeholder="Enter your full name"
                              className={`w-full h-14 text-lg rounded-xl border-2 transition-colors px-4 py-3 ${
                                nameError
                                  ? "border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500"
                                  : "border-grey-primary-tint-80 bg-grey-primary-tint-90 focus:ring-1 focus:outline-none focus:ring-primary-tint-10 focus:border-primary-tint-10"
                              } text-grey-primary-shade-10 placeholder-grey-primary`}
                              required
                            />
                            {nameError && (
                              <p className="mt-2 text-sm text-red-500">{nameError}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-grey-primary-shade-10 block font-medium mb-2">
                              Company Name (Optional)
                            </label>
                            <input
                              type="text"
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              placeholder="Your company"
                              className="w-full h-14 text-lg rounded-xl border-2 border-grey-primary-tint-80 bg-grey-primary-tint-90 text-grey-primary-shade-10 placeholder-grey-primary focus:ring-1 focus:outline-none focus:ring-primary-tint-10 focus:border-primary-tint-10 px-4 py-3"
                            />
                          </div>

                          <div>
                            <label className="text-grey-primary-shade-10 block font-medium mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={handleEmailChange}
                              onBlur={() => setEmailError(validateEmail(email))}
                              placeholder="your@email.com"
                              className={`w-full h-14 text-lg rounded-xl border-2 transition-colors px-4 py-3 ${
                                emailError
                                  ? "border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500"
                                  : "border-grey-primary-tint-80 bg-grey-primary-tint-90 focus:ring-1 focus:outline-none  focus:ring-primary-tint-10 focus:border-primary-tint-10"
                              } text-grey-primary-shade-10 placeholder-grey-primary`}
                              required
                            />
                            {emailError && (
                              <p className="mt-2 text-sm text-red-500">{emailError}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-grey-primary-shade-10 block font-medium mb-2">
                              Phone Number (Optional)
                            </label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={handlePhoneChange}
                              onBlur={() => setPhoneError(validatePhone(phone))}
                              placeholder="+1 (555) 000-0000"
                              className={`w-full h-14 text-lg rounded-xl border-2 transition-colors px-4 py-3 ${
                                phoneError
                                  ? "border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500"
                                  : "border-grey-primary-tint-80 bg-grey-primary-tint-90 focus:ring-1 focus:outline-none focus:ring-primary-tint-10 focus:border-primary-tint-10"
                              } text-grey-primary-shade-10 placeholder-grey-primary`}
                            />
                            {phoneError && (
                              <p className="mt-2 text-sm text-red-500">{phoneError}</p>
                            )}
                          </div>
                        </div>

                        <div className="mt-8 flex items-center justify-end">
                          <button
                            type="submit"
                            disabled={!isStep6Valid}
                            className={`flex items-center justify-center gap-2 text-xl px-10 py-4 rounded-lg font-semibold text-neutral-white transition-all disabled:opacity-50 ${
                              isStep6Valid
                                ? "bg-primary-tint-10 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                                : "bg-grey-primary-tint-70 cursor-not-allowed"
                            }`}
                          >
                            <span>Continue</span>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M16 12H3"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16 12l-5-5"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16 12l-5 5"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Step 7: Project Description */}
                    {step === 7 && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (isStep7Valid) next();
                        }}
                        className="flex flex-col justify-center"
                      >
                        <div className="mb-2 mt-20">
                          <span className="inline-block px-3 py-1 bg-primary-tint-90 text-primary-tint-10 rounded-full text-sm font-medium">
                            Project Details
                          </span>
                        </div>
                        <h2
                          className="mb-4 text-grey-primary-shade-90"
                          style={{
                            fontSize: "2.1rem",
                            fontWeight: 500,
                            textAlign: "left",
                            letterSpacing: "-0.01em",
                            lineHeight: "1.15",
                          }}
                        >
                          Tell us about your project{" "}
                          <span
                            style={{
                              color: 'text-grey-primary-shade-90',
                              fontSize: "2.1rem",
                              verticalAlign: "super",
                            }}
                          >
                            *
                          </span>
                        </h2>
                        <p className="mb-8 text-grey-primary-shade-80 text-lg">
                          Share key requirements, goals, and any specific skills needed (minimum 20 characters)
                        </p>

                        <div>
                          <textarea
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            placeholder="Describe your project, key objectives, required skills, and any specific requirements..."
                            rows={8}
                            className="w-full text-lg rounded-xl border-2 border-grey-primary-tint-80 bg-grey-primary-tint-90 text-grey-primary-shade-10 placeholder-grey-primary focus:ring-1 focus:outline-none focus:ring-primary-tint-10 focus:border-primary-tint-10 px-4 py-3 resize-none"
                            required
                          />
                          <div className="mt-2 flex justify-between items-center">
                            <span
                              className={`text-sm ${
                                projectDescription.length >= 20
                                  ? "text-primary-tint-10"
                                  : "text-grey-primary"
                              }`}
                            >
                              {projectDescription.length}/20 characters minimum
                            </span>
                          </div>
                        </div>

                        <div className="mt-8 flex items-center justify-end">
                          <button
                            type="submit"
                            disabled={!isStep7Valid}
                            className={`flex items-center justify-center gap-2 text-xl px-10 py-4 rounded-lg font-semibold text-neutral-white transition-all disabled:opacity-50 ${
                              isStep7Valid
                                ? "bg-primary-tint-10 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                                : "bg-grey-primary-tint-70 cursor-not-allowed"
                            }`}
                          >
                            <span>Continue</span>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M16 12H3"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16 12l-5-5"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16 12l-5 5"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Step 8: Discovery + Submit */}
                    {step === 8 && (
                      <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-center"
                      >
                        <div className="mb-2">
                          <span className="inline-block px-3 py-1 bg-primary-tint-90 text-primary-tint-10 rounded-full text-sm font-medium">
                            Final Step
                          </span>
                        </div>
                        <h2
                          className="mb-4 text-grey-primary-shade-90"
                          style={{
                            fontSize: "2.1rem",
                            fontWeight: 500,
                            textAlign: "left",
                            letterSpacing: "-0.01em",
                            lineHeight: "1.15",
                          }}
                        >
                          How did you hear about us?{" "}
                          <span
                            style={{
                              color: 'text-grey-primary-shade-90',
                              fontSize: "2.1rem",
                              verticalAlign: "super",
                            }}
                          >
                            *
                          </span>
                        </h2>
                        <p className="mb-8 text-grey-primary-shade-80 text-lg">
                          This helps us improve our reach and serve you better
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {DISCOVERY_OPTIONS.map((d) => {
                            const selected = discovery === d;
                            return (
                              <motion.button
                                key={d}
                                type="button"
                                onClick={() => handleDiscoverySelect(d)}
                                className={`p-6 rounded-xl border-2 text-center transition-all ${
                                  selected
                                    ? "bg-neutral-white border-primary-tint-10 shadow-md"
                                    : "bg-grey-primary-tint-90 border-grey-primary-tint-80 hover:border-grey-primary-tint-70 hover:shadow-sm"
                                } cursor-pointer`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="text-grey-primary-shade-10 font-semibold text-base">
                                  {d}
                                </div>
                                <div
                                  className="mt-3 h-1 w-12 rounded-full mx-auto transition-colors"
                                  style={{
                                    backgroundColor: selected ? ACCENT : "#E5E3F2",
                                  }}
                                />
                              </motion.button>
                            );
                          })}
                        </div>

                        {discovery === "Other" && (
                          <div className="mt-6">
                            <input
                              type="text"
                              value={discoveryOther}
                              onChange={(e) => setDiscoveryOther(e.target.value)}
                              placeholder="Please specify how you found us"
                              className="w-full h-14 text-lg rounded-xl border-2 border-grey-primary-tint-80 bg-grey-primary-tint-90 text-grey-primary-shade-10 placeholder-grey-primary focus:ring-2 focus:ring-primary-tint-10 focus:border-primary-tint-10 px-4 py-3"
                              required
                            />
                          </div>
                        )}

                        <div className="mt-8 p-6 bg-primary-tint-90 rounded-xl border border-primary-tint-80">
                          <h3 className="text-grey-primary-shade-10 font-semibold text-lg mb-2">
                            📋 Review Your Submission
                          </h3>
                          <p className="text-grey-primary text-sm">
                            By submitting this form, you&apos;ll receive personalized talent recommendations within 24 hours. Our team will review your requirements and connect you with the best matches.
                          </p>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-grey-primary hover:text-primary-tint-10 text-base font-medium transition-colors"
                          >
                            ← Start Over
                          </button>
                          <button
                            type="submit"
                            disabled={!isStep8Valid || submitting}
                            className={`flex items-center justify-center gap-2 text-xl px-10 py-4 rounded-lg font-semibold text-neutral-white transition-all disabled:opacity-50 ${
                              !isStep8Valid || submitting
                                ? "bg-grey-primary-tint-70 cursor-not-allowed"
                                : "bg-primary-tint-10 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                            }`}
                          >
                            {submitting ? (
                              <>
                                <svg
                                  className="animate-spin h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                <span>Submitting...</span>
                              </>
                            ) : (
                              <>
                                <span>Submit Request</span>
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M5 12h14M12 5l7 7-7 7"
                                    stroke="#fff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
