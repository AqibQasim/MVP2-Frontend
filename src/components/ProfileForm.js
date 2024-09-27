import React, { useRef, useState } from "react";
import Heading from "./Heading";
import ButtonCapsule from "./ButtonCapsule";
import ButtonRounded from "./ButtonRounded";
import Button from "./Button";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { usePathname } from "next/navigation";
import ErrorPopup from "./ErrorPopup";

const ProfileForm = ({ client }) => {
  const pathname = usePathname();
  const client_id = pathname.split("/")[2];
  const [sucess, setsuccess] = useState(false);
  const [error, seterror] = useState(false);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const locationRef = useRef(null);
  const cityRef = useRef(null);
  const provinceRef = useRef(null);
  const areaCodeRef = useRef(null);
  const countryRef = useRef(null);

  console.log("client is", client);

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      endpoint: `client-profile-update/${client_id}`, // Use the client ID
      method: "PUT",
      body: {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        // email: emailRef.current.value,
        // password: passwordRef.current.value,
        client_location: locationRef.current.value,
        city: cityRef.current.value,
        province: provinceRef.current.value,
        area_code: areaCodeRef.current.value,
        country: countryRef.current.value,
      },
    };

    try {
      const result = await mvp2ApiHelper(payload);
      if (result.status === 200) {
        console.log("Client info updated successfully", result.data.result);
        setsuccess(true);
      } else {
        console.error("Error updating client info", result?.data?.message);
        seterror(true);
      }
    } catch (error) {
      console.error("Error while updating profile", error);
    }
  };

  // const [firstName, lastName] = client.name
  //   ? client.name.split(" ", 2)
  //   : ["", ""];
  return (
    <div className="">
      <form onSubmit={submitHandler}>
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
                  ref={firstNameRef}
                  defaultValue={client.name?.split(" ", 2)[0] || ""}
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
                  ref={lastNameRef}
                  defaultValue={client.name?.split(" ", 2)[1] || ""}
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
                  disabled
                  ref={emailRef}
                  defaultValue={client.email || ""}
                  type="email"
                  className="focus:ring-none not-allowed mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-4 items-start gap-4">
          <Heading xm className="col-span-1"></Heading>

          <div className="col-span-2">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex flex-1 flex-col">
                <b>
                  <label>Password</label>
                </b>
                <input
                  disabled
                  ref={passwordRef}
                  defaultValue={client.password || ""}
                  type="password"
                  className="focus:ring-none not-allowed mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
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
                  ref={locationRef}
                  defaultValue={client.client_location || ""}
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
                  ref={cityRef}
                  defaultValue={client.city || ""}
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
                  ref={provinceRef}
                  defaultValue={client.province || ""}
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <input
                  type="text"
                  ref={areaCodeRef}
                  defaultValue={client.area_code || ""}
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
                  ref={countryRef}
                  defaultValue={client.country || ""}
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
            <ButtonCapsule className="w-[50%]" type="submit">
              Update Info
            </ButtonCapsule>
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
      {sucess && (
        <ErrorPopup
          message="Profile Updated Successfully "
          type="success"
          onClose={() => setsuccess(false)}
        />
      )}
      {error && (
        <ErrorPopup
          message="Something went wrong , please try again"
          type="error"
          onClose={() => seterror(false)}
        />
      )}
    </div>
  );
};

export default ProfileForm;
