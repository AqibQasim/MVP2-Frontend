"use client";
import DashboardSection from "./DashboardSection";
import ProfileForm from "./ProfileForm";

function ClientSettings({ client }) {
  return (
    <DashboardSection className="!min-h-full" paragraph="" heading="Settings">
      <ProfileForm client={client} />
    </DashboardSection>
  );
}

export default ClientSettings;
