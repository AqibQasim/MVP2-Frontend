"use client";
import SvgIconDashboard from "@/svgs/SvgIconDashboard";
import SvgIconJob from "@/svgs/SvgIconJob";
import SvgIconPayment from "@/svgs/SvgIconPayment";
import SvgIconRecommended from "@/svgs/SvgIconRecommended";
import SvgIconSettings from "@/svgs/SvgIconSettings";
import SvgIconTalent from "@/svgs/SvgIconTalent";
// import SvgIconLogout from "@/svgs/SvgIconLogout"; // Assuming you have a logout icon
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

function ClientDashboardNavLinks({
  numJobs,
  numRecommended,
  numHired,
  children,
}) {
  const pathname = usePathname();

  const params = useParams();
  const clientId = params.clientId;

  const clientDashboardLinks = [
    {
      name: "Dashboard",
      href: `/client/${clientId}`,
      icon: (
        <SvgIconDashboard
          className="size-6"
          secondColor={
            pathname === `/client/${clientId}` ? "active" : "default"
          }
        />
      ),
    },
    {
      name: "Recommended",
      href: `/client/${clientId}/recommended`,
      icon: <SvgIconRecommended className="size-6" />,
      amount: numRecommended,
    },
    {
      name: "Jobs",
      href: `/client/${clientId}/jobs`,
      amount: numJobs,
      icon: <SvgIconJob className="size-6" />,
    },
    {
      name: "Talents",
      href: `/client/${clientId}/talents`,
      icon: <SvgIconTalent className="size-6" />,
      amount: numHired,
    },
    {
      name: "Payment",
      href: `/client/${clientId}/payment`,
      icon: <SvgIconPayment className="size-6" />,
    },
    {
      name: "Settings",
      href: `/client/${clientId}/settings`,
      icon: <SvgIconSettings className="size-6" />,
    },
  ];

  return (
    <nav
      aria-label="Client Dashboard Navigation"
      className="flex h-[calc(100%-5.25rem)] flex-col justify-between"
    >
      <ul className="nav-links">
        {clientDashboardLinks.map((link) => (
          <li key={link.href}>
            <Link
              className={`group flex items-center justify-start gap-3 rounded-[0.625rem] bg-transparent px-4 py-3 font-lufga text-sm font-medium text-grey-primary-shade-20 transition-colors duration-200 hover:bg-primary-tint-100 hover:text-primary-tint-20 ${
                pathname === link.href ? "!bg-primary text-neutral-white" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
              {link.amount ? (
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
      {children}
    </nav>
  );
}

export default ClientDashboardNavLinks;
