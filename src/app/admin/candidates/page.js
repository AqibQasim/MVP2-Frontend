import AdminCandidatesTable from "@/components/AdminCandidatesTable";
import { fetchCandidates } from "@/lib/data-service";

export const metadata = {
  title: "Candidates",
};

export const revalidate = 60 * 60 * 24; // invalidate every 24 hours

const page = async () => {
  const candidates = await fetchCandidates();

  return (
    <>
      <AdminCandidatesTable candidates={candidates} />
    </>
  );
};

export default page;
