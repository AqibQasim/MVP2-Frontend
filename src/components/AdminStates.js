import React from "react";
import Heading from "./Heading";
import { useEffect, useState } from "react";

const ClientEmptyScreen = () => {
  const [adminStats, setAdminStats] = useState(null);

  useEffect(() => {
    async function fetchAdminStats() {
      try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/get-stats`);
        const result = await res.json();
        console.log(result);

        if (result.status !== 200) throw new Error(`Error: ${result.err}`);

        setAdminStats(result.data);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    }

    fetchAdminStats();
  }, []);

  return (
    <div className="b g-neutral-white min-h-full w-auto gap-8 rounded-4xl px-8 py-10">
      {/* Steps Section */}
      <div>
        <div className="flex flex-wrap justify-between space-x-4">
          {/* Step 1 */}

          <div className="flex-1 flex-wrap rounded-lg bg-gray-100 p-6 shadow">
            <div className="mb-4 items-center">
              <div className="text-medium flex justify-between font-medium">
                <Heading xm>Total Jobs:</Heading>

                <div className="px-4">
                  {" "}
                  {(adminStats?.jobs?.interviewing ?? 0) +
                    (adminStats?.jobs?.hired ?? 0) +
                    (adminStats?.jobs?.open ?? 0) +
                    (adminStats?.jobs?.closed ?? 0)}{" "}
                </div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Interviewing:</div>

                <div className="px-4">
                  {adminStats?.jobs?.interviewing ?? 0}
                </div>
              </div>

              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Hired:</div>
                <div className="px-4"> {adminStats?.jobs?.hired ?? 0} </div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Open:</div>
                <div className="px-4">{adminStats?.jobs?.open ?? 0}</div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Closed:</div>
                <div className="px-4">{adminStats?.jobs?.closed ?? 0}</div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex-wrap rounded-lg bg-gray-100 p-6 shadow">
            <div className="mb-4 items-center">
              <div className="text-medium flex justify-between font-medium">
                <Heading xm>Total Candidates:</Heading>

                <div className="px-4">
                  {(adminStats?.candidates?.interviewing ?? 0) +
                    (adminStats?.candidates?.hired ?? 0) +
                    (adminStats?.candidates?.open ?? 0) +
                    (adminStats?.candidates?.trial ?? 0) +
                    (adminStats?.candidates?.closed ?? 0)}
                </div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Interviewing:</div>
                <div className="px-4">
                  {adminStats?.candidates?.interviewing ?? 0}
                </div>
              </div>

              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Hired:</div>
                <div className="px-4">{adminStats?.candidates?.hired ?? 0}</div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Open:</div>
                <div className="px-5">{adminStats?.candidates?.open ?? 0}</div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Trial:</div>
                <div className="px-4">{adminStats?.candidates?.trial ?? 0}</div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Closed:</div>
                <div className="px-4">
                  {adminStats?.candidates?.closed ?? 0}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex-wrap rounded-lg bg-gray-100 p-6 shadow lg:w-[15rem]">
            <div className="mb-4 items-center">
              <div className="text-medium flex justify-between font-medium">
                <Heading xm>Total Clients:</Heading>

                <div className="px-4">
                  {(adminStats?.clients?.no_jobs ?? 0) +
                    (adminStats?.clients.jobs ?? 0)}
                </div>
              </div>

              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">NO Jobs Posted:</div>
                <div className="px-4">{adminStats?.clients?.no_jobs ?? 0}</div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Posted Jobs:</div>
                <div className="px-4">{adminStats?.clients.jobs ?? 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientEmptyScreen;
