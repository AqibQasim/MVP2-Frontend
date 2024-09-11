"use client";
import SvgIconDashboard from "@/svgs/SvgIconDashboard";
import SvgIconJob from "@/svgs/SvgIconJob";
import SvgIconPayment from "@/svgs/SvgIconPayment";
import SvgIconSettings from "@/svgs/SvgIconSettings";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminDashboardNavLinks() {
  const pathname = usePathname();

  const candidateDashboardLinks = [
    {
      name: "Clients",
      href: `/admin/clients`,
      amount: 0,
      icon: (
        <SvgIconDashboard
          className="size-6"
          secondColor={
            pathname === "/admin/clients"
          }
        />
      ),
    },
    {
      name: "Jobs",
      href: `/admin/jobs`,
      amount: 0,
      icon: <SvgIconJob className="size-6" />,
    },
    {
      name: "Candidates",
      href: `/admin/candidates`,
      amount: 0,
      icon: <SvgIconPayment className="size-6" />,
    },
  ];

  return (
    <nav aria-label="candidate Dashboard Navigation">
      <ul className="nav-links">
        {candidateDashboardLinks.map((link) => (
          <li key={link.href}>
            <Link
              className={`group flex items-center justify-start gap-3 rounded-[0.625rem] bg-transparent px-4 py-3 font-lufga text-sm font-medium text-grey-primary-shade-20 transition-colors duration-200 hover:bg-primary-tint-100 hover:text-primary-tint-20 ${pathname === link.href ? "!bg-primary text-neutral-white" : ""}`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
              {link.amount >= 0 ? (
                <span
                  className={`ml-auto inline-flex h-[1.6rem] w-[1.95rem] items-center justify-center rounded-4xl bg-grey-primary-tint-80 transition-colors duration-200 group-hover:bg-neutral-white ${pathname === link.href ? "!bg-neutral-white text-primary" : ""}`}
                >
                  {link.amount > 9 ? "9+" : link.amount}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default AdminDashboardNavLinks;
