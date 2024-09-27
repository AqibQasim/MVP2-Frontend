import AdminCandidatesTable from "@/components/AdminCandidatesTable";
import { fetchRecommendedCandidates } from "@/lib/data-service";

export const metadata = {
  title: "Candidates",
};

export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

const Page = async () => {
  try {
    const candidates = await fetchRecommendedCandidates();
    return <AdminCandidatesTable candidates={candidates} />;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return <div>Failed to load candidates.</div>;
  }
};

export default Page;
