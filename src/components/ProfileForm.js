// components/ProfileForm.jsx

import React from "react";
import Heading from "./Heading";
import ButtonCapsule from "./ButtonCapsule";
import ButtonRounded from "./ButtonRounded";
import Button from "./Button";

const ProfileForm = () => {
  return (
    <div className="">
      <form>
        {/* Row for Email Address */}
        <div className="mb-4 grid grid-cols-4 items-start gap-4">
          {/* Section Heading */}
          <Heading xm className="col-span-1">
            Email address
          </Heading>

          {/* Input Group */}
          <div className="col-span-2">
            {/* First Name and Last Name Row */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              {/* First Name */}
              <div className="flex flex-1 flex-col">
                <b>
                  <label>First Name</label>
                </b>
                <input
                  type="text"
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-1 flex-col">
                <b>
                  <label>Last Name</label>
                </b>
                <input
                  type="text"
                  className="mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none focus:ring-2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-4 items-start gap-4">
          {/* Section Heading */}
          <Heading xm className="col-span-1"></Heading>
          {/* Input Group */}
          <div className="col-span-2">
            {/* First Name and Last Name Row */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              {/* First Name */}
              <div className="flex flex-1 flex-col">
                <b>
                  <label>Email</label>
                </b>
                <input
                  type="email"
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-4 items-start gap-4">
          {/* Section Heading */}
          <Heading xm className="col-span-1"></Heading>
          {/* Input Group */}
          <div className="col-span-2">
            {/* First Name and Last Name Row */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              {/* First Name */}
              <div className="flex flex-1 flex-col">
                <b>
                  <label>Password</label>
                </b>
                <input
                  type="password"
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className="mb-4 mt-4 grid grid-cols-4 items-start gap-4">
          {/* Section Heading */}
          <Heading xm className="col-span-1">
            Street address
          </Heading>

          {/* Input Group */}
          <div className="col-span-2">
            {/* First Name and Last Name Row */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              {/* First Name */}
              <div className="flex flex-1 flex-col">
                <input
                  type="text"
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="mb-4 mt-4 grid grid-cols-4 items-start gap-4">
          {/* Section Heading */}
          <Heading xm className="col-span-1">
            City
          </Heading>

          {/* Input Group */}
          <div className="col-span-2">
            {/* First Name and Last Name Row */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              {/* First Name */}
              <div className="flex flex-1 flex-col">
                <input
                  type="text"
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="mb-4 mt-4 grid grid-cols-4 items-start gap-4">
          {/* Section Heading */}
          <Heading xm className="col-span-1">
            State/Province
          </Heading>

          <div className="col-span-2">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              {/* First Name */}
              <div className="flex flex-1 flex-col">
                <input
                  type="text"
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <input
                  type="text"
                  className="mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none focus:ring-2"
                />
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className="mb-4 mt-4 grid grid-cols-4 items-start gap-4">
          {/* Section Heading */}
          <Heading xm className="col-span-1">
            Country
          </Heading>

          <div className="col-span-2">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex flex-1 flex-col">
                <input
                  type="text"
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 mt-4 grid grid-cols-4 items-start gap-4">
          {/* Section Heading */}
          <Heading xm className="col-span-1"></Heading>
          <button></button>

          <div className="col-span-2">
            <ButtonCapsule className="w-[50%]">Update Info</ButtonCapsule>
          </div>
        </div>

        {/* Buttons */}
        {/* <div className="mt-6 flex justify-between">
          <button
            type="button"
            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Update Info
            <span className="ml-2">&rarr;</span>
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default ProfileForm;
