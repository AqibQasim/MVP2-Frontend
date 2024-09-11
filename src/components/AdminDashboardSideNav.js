import AdminDashboardNavLinks from '@/components/AdminDashboardNavLinks';
import Logo from "./Logo";

function AdminDashboardSideNav() {


  return (
    <div className="space-y-12">
      <Logo />
      <AdminDashboardNavLinks />
    </div>
  );
}

export default AdminDashboardSideNav;
