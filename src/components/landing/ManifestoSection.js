import Image from "next/image";
import LandingButton from "./LandingButton";
import SectionLabel from "./SectionLabel";
import FeatureList from "./FeatureList";

const TALENT_FEATURES = [
  "Vetted projects only — never spam, never bids",
  "Transparent rate, transparent scope",
  "Fractional, contract, or long engagements",
  "A success partner from day one",
];

const CLIENT_FEATURES = [
  "Hand-matched in under 48 hours",
  "Top 3% — every member rigorously assessed",
  "Risk-free 2-week trial on every match",
  "One contract. Global compliance handled.",
];

export default function ManifestoSection() {
  return (
    <section className="landing-manifesto-section">
      <div className="landing-container landing-manifesto-intro pb-16 lg:pb-24">
        <SectionLabel className="mb-8">(02) — Manifesto</SectionLabel>
        <h2 className="landing-manifesto-headline landing-display max-w-5xl text-[clamp(1.75rem,4vw,3.25rem)] leading-snug text-[var(--landing-navy)]">
          Talent platforms became{" "}
          <span className="landing-manifesto-struck">auction houses.</span> Hiring
          became a scroll. We built{" "}
          <span className="landing-manifesto-brand">Covental</span> to feel more
          like an{" "}
          <span className="landing-manifesto-pill">editorial index</span> than a
          job board —{" "}
          <span className="landing-manifesto-tail">
            every entry curated, every match earned.
          </span>
        </h2>
      </div>

      <div className="landing-manifesto-split grid lg:grid-cols-2">
        <div
          id="talent"
          className="landing-manifesto-talent relative overflow-hidden p-8 lg:p-12 xl:p-16"
        >
          <Image
            src="/background-talent-bottom.png"
            alt=""
            width={480}
            height={360}
            aria-hidden
            className="landing-manifesto-talent-decor pointer-events-none select-none"
          />
          <h3 className="landing-split-headline relative z-[1]">
            Work worth your{" "}
            <span className="landing-split-accent landing-split-accent-purple">
              craft.
            </span>
          </h3>
          <p className="landing-split-body relative z-[1] mt-6 max-w-lg leading-relaxed">
            Stop hunting. Covental routes pre-screened projects to you, sized to
            your rate, stack and availability — with a real person on call.
          </p>
          <div className="relative z-[1] mt-8">
            <FeatureList items={TALENT_FEATURES} variant="light" />
          </div>
          <div className="relative z-[1] mt-10">
            <LandingButton href="/talent-signup">Apply as Talent</LandingButton>
          </div>
        </div>

        <div
          id="clients"
          className="landing-manifesto-clients p-8 lg:p-12 xl:p-16"
        >
          <h3 className="landing-split-headline landing-split-headline-light">
            Hire Without{" "}
            <span className="landing-split-accent landing-split-accent-orange">
              search.
            </span>
          </h3>
          <p className="landing-split-body landing-split-body-light mt-6 max-w-lg leading-relaxed">
            Send a brief. Get a hand-matched shortlist in 48 hours. Interview
            only the candidates worth your time.
          </p>
          <div className="mt-8">
            <FeatureList items={CLIENT_FEATURES} variant="dark" />
          </div>
          <div className="mt-10">
            <LandingButton href="/company-signup" variant="orange">
              Request a match
            </LandingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
