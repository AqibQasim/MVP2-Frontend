import ClientDashboardNavLinks from "./ClientDashboardNavLinks";
import Logo from "./Logo";

function ClientDashboardSideNav({ clientId }) {
  console.log("Client id is this", clientId);

  return (
    <div className="space-y-12">
      <Logo />
      <ClientDashboardNavLinks clientId={clientId} />
    </div>
  );
}

export default ClientDashboardSideNav;
