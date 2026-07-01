import Image from "next/image";

export default function FilterSection() {
  return (
    <section className="landing-filter-section" aria-label="Hiring funnel">
      <div className="landing-container">
        <Image
          src="/filter-section-image.png"
          alt="Discover, Match, Interview, and Hire funnel"
          width={5756}
          height={4180}
          className="landing-filter-image"
          sizes="(min-width: 1280px) 1240px, 100vw"
        />
      </div>
    </section>
  );
}
