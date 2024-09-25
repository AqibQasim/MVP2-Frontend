"use client";
import CandidateProfileForm from "./CandidateProfileForm";
import DashboardSection from "./DashboardSection";

function CandidateSettings() {
  return (
    <DashboardSection className="!min-h-full" paragraph="" heading="Settings">
      <CandidateProfileForm />
    </DashboardSection>
  );
}

export default CandidateSettings;
