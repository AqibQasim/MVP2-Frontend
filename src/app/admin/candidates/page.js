import AdminCandidatesTable from "@/components/AdminCandidatesTable";
import { fetchRecommendedCandidates } from "@/lib/data-service";

export const metadata = {
  title: "Candidates",
};

export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

const Page = async () => {
  let candidates = [];
  try {
    const { data, error } = await fetchRecommendedCandidates();
    if (error) throw new Error(error);
    candidates = data;
  } catch (err) {
    return <div>Failed to load candidates: {err.message}</div>;
  }

  return <AdminCandidatesTable candidates={candidates} />;
};

export default Page;
