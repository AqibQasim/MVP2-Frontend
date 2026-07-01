import Image from "next/image";
import LiveMatchesTicker from "./LiveMatchesTicker";

const MATCHES = [
  {
    num: "01",
    title: "Staff Frontend Engineer",
    org: "Helios Labs · Series C",
    location: "Remote · EU",
    match: "96",
  },
  {
    num: "02",
    title: "Principal Product Designer",
    org: "Northwind",
    location: "NYC",
    match: "98",
  },
  {
    num: "03",
    title: "Fractional Head of Product",
    org: "Cobalt.io",
    location: "NYC",
    match: "92",
  },
  {
    num: "04",
    title: "Brand Director (6mo)",
    org: "Atlas Studio",
    location: "Remote · EU",
    match: "89",
  },
  {
    num: "05",
    title: "Senior Backend Engineer",
    org: "Nova Systems",
    location: "Remote · US",
    match: "94",
  },
  {
    num: "06",
    title: "Growth Marketing Lead",
    org: "Meridian",
    location: "London",
    match: "91",
  },
];

export default function LiveMatchesSection() {
  return (
    <section className="landing-live-matches-section relative hidden overflow-hidden md:block">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/background%20curve%20lines.png"
          alt=""
          width={1440}
          height={520}
          className="absolute left-1/2 top-1/2 h-auto min-h-[280px] w-[min(1440px,120vw)] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
        />
      </div>

      <div className="landing-container relative z-[1]">
        <div className="overflow-hidden rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-bg-white)] shadow-sm">
          <div className="border-b border-[var(--landing-border)] bg-[var(--landing-bg-white)] px-6 py-4 lg:px-8">
            <div className="grid grid-cols-12 items-center gap-2 text-xs uppercase tracking-widest text-[var(--landing-text-muted)]">
              <div className="col-span-12 flex items-center gap-2 md:col-span-6">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="landing-live-dot absolute inline-flex h-full w-full rounded-full bg-[var(--landing-accent-live)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--landing-accent-live)]" />
                </span>
                <span>Live · Matches made today</span>
              </div>
              <span className="col-span-3 hidden md:block">Organization</span>
              <span className="col-span-2 hidden md:block">Location</span>
              <span className="col-span-1 hidden text-right md:block">Match %</span>
            </div>
          </div>

          <LiveMatchesTicker rows={MATCHES} />
        </div>
      </div>
    </section>
  );
}
