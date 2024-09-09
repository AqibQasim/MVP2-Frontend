import Image from "next/image";
function NotFound({ error }) {
  // console.log("Error: ", error);

  return (
    <main className="mt-20 flex flex-col items-center justify-center space-y-6 px-4 text-center lg:mt-0 lg:h-[calc(100dvh-7.25em)]">
      <Image 
        src="/candidate_no_data.png"
        width="200"
        height="200"
        alt="No data Image"

      />
      <div>
        <p className="font-bold">No data available </p>
      <p className="text-[#86819B]">Get started by adding your first item.</p>
      </div>
      
      
    </main>
  );
}

export default NotFound;
