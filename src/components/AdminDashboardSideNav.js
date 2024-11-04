import AdminDashboardNavLinks from "@/components/AdminDashboardNavLinks";
import Logo from "./Logo";
import AdminLogout from "./AdminLogout";

function AdminDashboardSideNav() {
  return (
    <div className="space-y-12">
      <Logo />
      <AdminDashboardNavLinks />
      <AdminLogout />
    </div>
  );
}

export default AdminDashboardSideNav;
