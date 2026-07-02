"use client";

import { useMemo, useState } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingButton from "@/components/landing/LandingButton";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileOverviewLayout from "@/components/profile/ProfileOverview";
import ProfileExperience from "@/components/profile/ProfileExperience";
import ProfileProjects from "@/components/profile/ProfileProjects";
import ProfileEducation from "@/components/profile/ProfileEducation";
import ProfileCertifications from "@/components/profile/ProfileCertifications";
import ProfileSkillsSection from "@/components/profile/ProfileSkillsSection";
import ReportOverlay from "@/components/ReportOverlay";
import { calculateCumulativeMean } from "@/utils/calculatCumulativeMean";
import {
  candidateProfileImageUrl,
  pickProfileImagePath,
} from "@/app/profile/[candidateId]/profileImageUrl";

export default function CandidatePublicProfile({
  talent,
  customerId,
  candidateReport,
}) {
  const [isReportOverlayOpened, setIsReportOverlayOpened] = useState(false);

  const profileImageUrl = candidateProfileImageUrl(
    pickProfileImagePath(talent),
    customerId,
  );

  const indexScore = parseInt(
    calculateCumulativeMean(
      candidateReport?.result?.technicalRating,
      candidateReport?.result?.softskillRating,
      null,
    ) ?? 0,
    10,
  );

  const skillCategoryData = useMemo(() => {
    const possibleSources = [
      talent?.skill_categories,
      talent?.skills_categories,
      talent?.skills_category,
      talent?.skills,
      talent?.skillCategory,
      talent?.skill_data,
    ].filter(Boolean);

    if (!possibleSources.length) return null;
    const raw = possibleSources[0];

    if (typeof raw === "string") {
      try {
        return JSON.parse(raw);
      } catch {
        return { other: raw };
      }
    }

    return raw;
  }, [talent]);

  const handleDownloadCv = () => {
    if (candidateReport) {
      setIsReportOverlayOpened(true);
    }
  };

  return (
    <>
      <div className="landing-hero-shell relative overflow-x-clip">
        <div className="landing-header-glow" aria-hidden />
        <LandingHeader />
      </div>

      <main className="profile-page">
        <div className="landing-container profile-main">
          <ProfileHero
            talent={talent}
            customerId={customerId}
            profileImageUrl={profileImageUrl}
            indexScore={indexScore}
            onDownloadCv={handleDownloadCv}
          />

          <ProfileOverviewLayout
            talent={talent}
            customerId={customerId}
            skillCategoryData={skillCategoryData}
          >
            <ProfileExperience talent={talent} />
            <ProfileProjects talent={talent} />
            <ProfileEducation talent={talent} />
            <ProfileCertifications talent={talent} />
            <ProfileSkillsSection skillCategoryData={skillCategoryData} />
          </ProfileOverviewLayout>

          <div className="profile-cta">
            <p className="profile-cta-copy">
              Top talent is in high demand.
            </p>
            <LandingButton
              href={`/book-talent/${customerId}`}
              variant="orange"
              showArrow
            >
              Start hiring
            </LandingButton>
          </div>
        </div>
      </main>

      <LandingFooter />

      {isReportOverlayOpened ? (
        <ReportOverlay
          reportOverlay={isReportOverlayOpened}
          onClose={() => setIsReportOverlayOpened(false)}
          selectedCandidate={candidateReport}
          profileImage={profileImageUrl}
        />
      ) : null}
    </>
  );
}
