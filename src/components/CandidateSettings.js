"use client";
import DashboardSection from "./DashboardSection";
import ProfileForm from "./ProfileForm";

function CandidateSettings() {
  return (
    <DashboardSection className="!min-h-full" paragraph="" heading="Settings">
      <ProfileForm />
    </DashboardSection>
  );
}

export default CandidateSettings;
