"use client";
import DashboardSection from "./DashboardSection";
import ProfileForm from "./ProfileForm";

function ClientSettings() {
  return (
    <DashboardSection className="!min-h-full" paragraph="" heading="Settings">
      <ProfileForm />
    </DashboardSection>
  );
}

export default ClientSettings;
