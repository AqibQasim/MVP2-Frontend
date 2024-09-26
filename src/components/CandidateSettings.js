"use client";
import CandidateProfileForm from "./CandidateProfileForm";
import DashboardSection from "./DashboardSection";

function CandidateSettings({ candidate }) {
  return (
    <DashboardSection className="!min-h-full" paragraph="" heading="Settings">
      <CandidateProfileForm candidate={candidate} />
    </DashboardSection>
  );
};

export default CandidateSettings;
