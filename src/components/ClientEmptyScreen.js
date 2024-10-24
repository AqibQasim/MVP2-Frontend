import React from "react";
import Heading from "./Heading";

const ClientEmptyScreen = () => {
  return (
    <div>
      <div className="flex flex-col xl:flex-row items-center justify-between">
        <div className="w-full xl:w-1/2 ">
          <Heading sm className="text-4xl font-medium text-gray-900">
            Learn About How MVP Works
          </Heading>
          <p className="text-md mt-4 text-gray-500">
            Learn more about mvp while you wait. Discover how we help you hire
            world-class talent from our exclusive network.
          </p>
        </div>

        {/* Right Column for Video */}
        <div className="flex w-full xl:w-1/2 cursor-pointer items-center justify-center">
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gray-200">
            {/* Placeholder for the video play icon */}
            <span className="text-4xl">▶️</span>
          </div>
        </div>
      </div>
      <div className="mb-16 flex flex-row items-center justify-between">
        {/* Existing content for first two-column layout */}
      </div>

      {/* Steps Section */}
      <div>
        <Heading sm className="mb-6 text-2xl font-medium">
          How We Make Hiring Easy
        </Heading>
        <div className="flex  flex-col xl:flex-row justify-between xl:space-x-4 space-y-4 xl:space-y-0">
          {/* Step 1 */}
          <div className="flex-1 rounded-lg bg-gray-100 p-6 shadow">
            <div className="mb-4 flex items-center">
              <div className="text-medium flex items-center font-medium">
                <Heading xm>
                  <span className="border-grey-800 mr-2 rounded-full border bg-white px-2 font-medium">
                    1
                  </span>{" "}
                  Sign up
                </Heading>
              </div>
              <div className="ml-auto"></div>
            </div>
            <p className="text-gray-600">
              Start your hiring journey by creating a free account on our
              platform. Gain access to a wide network of talented professionals
              from around the world.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex-1  xl:mt-3 rounded-lg bg-gray-100 p-6 shadow">
            <div className="text-medium flex items-center font-medium">
              <Heading xm>
                <span className="border-grey-800 mr-2 rounded-full border bg-white px-2 font-medium">
                  2
                </span>{" "}
                Manage Your Account
              </Heading>
            </div>
            <p className="text-gray-600">
              Customize your hiring preferences, from job categories to required
              skills. Our algorithm matches you with the best candidates based
              on your needs.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex-1 xl:mt-3 rounded-lg bg-gray-100 p-6 shadow">
            <div className="text-medium flex items-center font-medium">
              <Heading xm>
                <span className="border-grey-800 mr-2 rounded-full border bg-white px-2 font-medium">
                  3
                </span>{" "}
                Hire Your First Talent
              </Heading>
            </div>
            <p className="text-gray-600">
              Browse through a curated list of top talents matched to your job
              posting. Schedule interviews, communicate, and hire with just a
              few clicks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientEmptyScreen;
