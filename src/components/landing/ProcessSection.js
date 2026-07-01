import SectionLabel from "./SectionLabel";

const STEPS = [
  { num: "01", label: "INTAKE", title: "Apply or brief" },
  { num: "02", label: "INTAKE", title: "Assessed by humans" },
  { num: "03", label: "INTAKE", title: "Hand-paired" },
  { num: "04", label: "INTAKE", title: "Start in days" },
];

const STEP_DETAIL =
  "Average time from brief to first interview: 48 hours. Average time to kickoff: under a week.";

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="landing-process-section relative pt-16 pb-10 lg:pt-24 lg:pb-14"
    >
      <div className="landing-container relative z-[1]">
        <SectionLabel className="mb-4">(04) — Process</SectionLabel>
        <h2 className="landing-process-headline max-w-3xl">
          A controlled process.
          <br />
          <span className="landing-process-both">Both</span>{" "}
          <span className="landing-process-sides">sides.</span>
        </h2>

        <div className="landing-process-list-wrap mt-12 lg:mt-16">
          <div className="landing-process-bg" aria-hidden />

          <div className="landing-process-list relative z-[1]">
            {STEPS.map((step) => (
              <div key={step.num} className="landing-process-row">
                <div className="landing-process-row-inner">
                  <div className="landing-process-row-grid">
                    <span className="landing-process-num">{step.num}</span>
                    <span className="landing-process-label">{step.label}</span>
                    <span className="landing-process-title">{step.title}</span>
                    <p className="landing-process-detail">{STEP_DETAIL}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
