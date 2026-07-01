import LandingButton from "./LandingButton";
import SectionLabel from "./SectionLabel";

export default function JoinCTASection() {
  return (
    <section className="landing-join-section">
      <div className="landing-container">
        <div className="landing-join-card">
          <div className="landing-join-grid" aria-hidden />

          <div className="landing-join-inner">
            <div className="landing-join-copy">
              <SectionLabel className="landing-join-label mb-4">
                (09) — Join the index
              </SectionLabel>
              <h2 className="landing-join-headline">
                <span className="landing-join-headline-line">
                  Quality over quantity,
                </span>
                <span className="landing-join-headline-line landing-join-headline-accent">
                  always.
                </span>
              </h2>
              <p className="landing-join-body">
                Whether you&apos;re hiring or being hired — Covental is built for
                people who take their craft seriously.
              </p>
            </div>

            <div className="landing-join-actions">
              <LandingButton href="/talent-signup" variant="orangeWhite">
                Apply as Talent
              </LandingButton>
              <LandingButton href="/company-signup" variant="glass">
                Hire Talent
              </LandingButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
