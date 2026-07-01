import Image from "next/image";
import LandingButton from "./LandingButton";
import TalentBarMarquee from "./TalentBarMarquee";

function WavyAccentLine() {
  return (
    <Image
      src="/landing-orange-accent-line.svg"
      alt=""
      width={80}
      height={16}
      aria-hidden
      className="h-[14px] w-[72px] shrink-0 object-contain md:h-[15px] md:w-[80px]"
    />
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-0">
      <div className="landing-container relative z-[1] pb-0 pt-4 lg:pt-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-6 xl:gap-8">
          <div className="max-w-[705px] lg:max-w-none lg:pr-4 xl:pr-6">
            <div className="mb-6 flex items-center gap-2 text-sm text-[var(--landing-navy)]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="var(--landing-accent-orange)"
                aria-hidden
                className="shrink-0"
              >
                <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17.8 5.7 19l2.3-7-6-4.6h7.6L12 2z" />
              </svg>
              <span>
                <strong className="font-semibold">4.9/5</strong>
                <span className="text-[var(--landing-text-muted)]">
                  {" "}
                  by 20K recruiters and talents worldwide
                </span>
              </span>
            </div>

            <h1 className="landing-hero-headline">
              <span className="landing-hero-matched">Matched,</span>
              <span className="landing-hero-not-browsed">not browsed.</span>
            </h1>

            <div className="mt-5 flex items-center gap-3.5">
              <WavyAccentLine />
              <p className="landing-hero-tagline">The talent network.</p>
            </div>

            <p className="mt-5 max-w-[705px] text-[0.9375rem] leading-relaxed text-[var(--landing-text-muted)]">
              Covental is an invitation-grade marketplace pairing the top 3% of
              independent operators with high-trust client work.{" "}
              <span className="landing-description-highlight">
                No bidding. No noise.
              </span>
            </p>

            <div className="landing-hero-actions mt-8">
              <LandingButton href="/talent-signup" dotColor="orange">
                <span className="landing-hero-cta-short">Apply</span>
                <span className="landing-hero-cta-full">
                  I&apos;m talent — apply to join
                </span>
              </LandingButton>
              <LandingButton href="/company-signup" variant="outline" dotColor="blue">
                <span className="landing-hero-cta-short">Hire talent</span>
                <span className="landing-hero-cta-full">
                  I&apos;m hiring — request a match
                </span>
              </LandingButton>
            </div>
          </div>

          <div className="relative hidden min-w-0 lg:flex lg:justify-end lg:-mr-4 xl:-mr-8 2xl:-mr-2">
            <Image
              src="/globe-hero-image.png"
              alt="Covental global talent network"
              width={672}
              height={480}
              priority
              className="relative h-auto w-full max-w-[672px] object-contain lg:-right-6 xl:-right-10 2xl:-right-4"
            />
          </div>
        </div>
      </div>

      <div className="landing-talent-bar mt-16 overflow-hidden py-5 lg:mt-24">
        <TalentBarMarquee />
      </div>
    </section>
  );
}
