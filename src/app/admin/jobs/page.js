import AdminCreateJob from "@/components/AdminCreateJob";
import AdminJobsList from "@/components/AdminJobsList";
import Button from "@/components/Button";
import ClientSideModal from "@/components/ClientSideModal";

const Page = () => {
  return (
    <>
      <header className="flex justify-between rounded-4xl bg-neutral-white p-4">
        <div className="text-2xl font-bold">Admin</div>
        <ClientSideModal
          opens="create-job"
          button={<Button className="rounded-full">Create a Job</Button>}
          window={<AdminCreateJob />}
        />
      </header>

      <AdminJobsList />
    </>
  );
};

export default Page;
