import AdminCandidatesTable from "@/components/AdminCandidatesTable";
import { fetchRecommendedCandidates } from "@/lib/data-service";

export const metadata = {
  title: "Candidates",
};

export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

const Page = async () => {
  const { data: candidates, error } = await fetchRecommendedCandidates();
  if (error) throw new Error(error);

  return <AdminCandidatesTable candidates={candidates} />;
};

export default Page;
