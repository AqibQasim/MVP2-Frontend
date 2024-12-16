"use client";
import SvgIconDashboard from "@/svgs/SvgIconDashboard";
import SvgIconJob from "@/svgs/SvgIconJob";
import SvgIconPayment from "@/svgs/SvgIconPayment";
import SvgIconSettings from "@/svgs/SvgIconSettings";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
function CandidateDashboardNavLinks({ candidateId }) {
  const pathname = usePathname();
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const cid = candidateId;
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/get-job-candidates?job_status=hired-and-trial&candidate_id=${cid}`,
        );
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }
        const data = await response.json();
        console.log(data);

        let filteredData = null;

        if (data?.status === 200) {
          filteredData = data?.data?.filter(
            (item) => item.customer_info.customer_id === cid,
          );
        }

        setJobs(filteredData); // assuming the data is in the 'data' field
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    console.log(jobs, "payment //////")
  }, []);

  const candidateDashboardLinks = [
    {
      name: "Dashboard",
      href: `/candidate/${candidateId}`,
      icon: (
        <SvgIconDashboard
          className="size-6"
          secondColor={
            pathname === `/candidate/${candidateId}` ? "active" : "default"
          }
        />
      ),
    },
    {
      name: "Jobs",
      href: `/candidate/${candidateId}/jobs`,

      icon: <SvgIconJob className="size-6" />,
    },

    ...(jobs?.length >= 1
      ? [
          {
            name: "Payout",
            href: `/candidate/${candidateId}/payment`,
            icon: <SvgIconPayment className="size-6" />,
          },
        ]
      : []),
      
    
    {
      name: "Settings",
      href: `/candidate/${candidateId}/settings`,
      icon: <SvgIconSettings className="size-6" />,
    },
  ];

  return (
    <nav aria-label="candidate Dashboard Navigation">
      <ul className="nav-links">
        {candidateDashboardLinks.map((link) => (
          <li key={link?.href}>
            <Link
              className={`group flex items-center justify-start gap-3 rounded-[0.625rem] bg-transparent px-4 py-3 font-lufga text-sm font-medium text-grey-primary-shade-20 transition-colors duration-200 hover:bg-primary-tint-100 hover:text-primary-tint-20 ${pathname === link.href ? "!bg-primary text-neutral-white" : ""}`}
              href={link?.href}
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

export default CandidateDashboardNavLinks;
