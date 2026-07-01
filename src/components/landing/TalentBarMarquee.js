"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TALENT_CARDS = [
  {
    role: "Product Designer",
    name: "Pablo Bennet",
    rate: "$150/hr",
    avatar: "https://i.pravatar.cc/216?img=12",
  },
  {
    role: "Nursing Assistant",
    name: "Jane Cooper",
    rate: "$150/hr",
    avatar: "https://i.pravatar.cc/216?img=5",
  },
  {
    role: "Dog Trainer",
    name: "Jenny Wilson",
    rate: "$150/hr",
    avatar: "https://i.pravatar.cc/216?img=9",
  },
  {
    role: "Marketing Coordinator",
    name: "Annette Black",
    rate: "$150/hr",
    avatar: "https://i.pravatar.cc/216?img=32",
  },
  {
    role: "Software Engineer",
    name: "Marcus Chen",
    rate: "$165/hr",
    avatar: "https://i.pravatar.cc/216?img=15",
  },
  {
    role: "UX Researcher",
    name: "Sofia Reyes",
    rate: "$140/hr",
    avatar: "https://i.pravatar.cc/216?img=47",
  },
  {
    role: "Data Analyst",
    name: "David Kim",
    rate: "$155/hr",
    avatar: "https://i.pravatar.cc/216?img=33",
  },
  {
    role: "Content Strategist",
    name: "Emma Lewis",
    rate: "$130/hr",
    avatar: "https://i.pravatar.cc/216?img=25",
  },
];

function TalentCard({ card, showSeparator }) {
  return (
    <div className="flex shrink-0 items-center gap-8">
      {showSeparator && (
        <span className="landing-talent-separator hidden sm:block" aria-hidden />
      )}
      <div className="flex items-center gap-4">
        <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full border-2 border-white/15">
          <Image
            src={card.avatar}
            alt={card.name}
            width={108}
            height={108}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>
        <div className="min-w-[140px]">
          <span className="landing-role-pill">{card.role}</span>
          <p className="landing-display mt-1.5 text-lg font-semibold text-white">
            {card.name}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/55">
            {card.rate}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="var(--landing-accent-orange)"
              aria-hidden
            >
              <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17.8 5.7 19l2.3-7-6-4.6h7.6L12 2z" />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TalentBarMarquee() {
  const loopCards = [...TALENT_CARDS, ...TALENT_CARDS];

  return (
    <div className="overflow-hidden" aria-label="Featured talent profiles">
      <motion.div
        className="landing-talent-marquee-track flex w-max gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 45,
            ease: "linear",
          },
        }}
      >
        {loopCards.map((card, i) => (
          <TalentCard
            key={`${card.name}-${i}`}
            card={card}
            showSeparator={i > 0}
          />
        ))}
      </motion.div>
    </div>
  );
}
