import React from "react";
import Heading from "./Heading";

const ClientEmptyScreen = () => {
  return (
    <div className="min-h-full w-full gap-8 rounded-4xl bg-neutral-white px-8 py-10">
      {/* Steps Section */}
      <div>
        <div className="flex flex-wrap justify-between">
          {/* Step 1 */}

          <div className="flex-wrap rounded-lg bg-gray-100 p-6 shadow">
            <div className="mb-4 items-center">
              <div className="text-medium flex justify-between font-medium">
                <Heading xm>Total Jobs:</Heading>

                <div className="px-4">1</div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Interviewing:</div>

                <div className="px-4">1</div>
              </div>

              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Hired:</div>
                <div className="px-4">1</div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Open:</div>
                <div className="px-4">1</div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Closed:</div>
                <div className="px-4">1</div>
              </div>
            </div>
          </div>
          <div className="flex-wrap rounded-lg bg-gray-100 p-6 shadow">
            <div className="mb-4 items-center">
              <div className="text-medium flex justify-between font-medium">
                <Heading xm>Total Candidates:</Heading>

                <div className="px-4">1</div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Interviewing:</div>

                <div className="px-4">1</div>
              </div>

              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Hired:</div>
                <div className="px-4">1</div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Open:</div>
                <div className="px-4">1</div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Closed:</div>
                <div className="px-4">1</div>
              </div>
            </div>
          </div>
          <div className="flex-wrap rounded-lg bg-gray-100 p-6 shadow">
            <div className="mb-4 items-center">
              <div className="text-medium flex justify-between font-medium">
                <Heading xm>Total Clients:</Heading>

                <div className="px-4">1</div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Interviewing:</div>

                <div className="px-4">1</div>
              </div>

              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">NO.Jobs:</div>
                <div className="px-4">1</div>
              </div>
              <div className="text-medium flex justify-between font-medium">
                <div className="text-xl">Jobs:</div>
                <div className="px-4">1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientEmptyScreen;
