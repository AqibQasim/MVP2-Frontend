import React, { useState, useRef, useEffect } from "react";
import Heading from "./Heading";
import ButtonCapsule from "./ButtonCapsule";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import ErrorPopup from "./ErrorPopup";
// import { useEffect } from "react/cjs/react.production.min";

const CandidateProfileForm = ({ candidate }) => {
  const parsedValue = JSON.parse(candidate.value);
  console.log("candidate values are :", parsedValue);
  const [sucess, setsuccess] = useState(false);
  const [error, seterror] = useState(false);

  // Refs for form fields
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const streetAddressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const areaCodeRef = useRef(null);
  const countryRef = useRef(null);



  useEffect(() => {
    console.log("the parsed customer id is ", parsedValue.data.customer_id)
  }, [parsedValue])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      endpoint: `profile-info-update/${parsedValue.data.customer_id}`,
      method: "PUT",
      body: {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        customer_location: streetAddressRef.current.value,
        city: cityRef.current.value,
        province: stateRef.current.value,
        area_code: areaCodeRef.current.value,
        country: countryRef.current.value,
      },
    };

    try {
      const result = await mvp2ApiHelper(payload);

      if (result.status === 200) {
        console.log("Profile updated successfully!");
        setsuccess(true);
      } else {
        console.error("Failed to update profile.");
        seterror(true);
      }
    } catch (error) {
      console.error("Error while updating profile:", error);
    }
  };


  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        {/* Row for Email Address */}
        <div className="mb-4 grid grid-cols-4 items-start gap-4">
          <Heading xm className="col-span-1">
            Email address
          </Heading>

          <div className="col-span-2">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex flex-1 flex-col">
                <b>
                  <label>First Name</label>
                </b>
                <input
                  ref={firstNameRef}
                  type="text"
                  defaultValue={parsedValue.data.name.split(" ", 2)[0] || ""}
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <b>
                  <label>Last Name</label>
                </b>
                <input
                  ref={lastNameRef}
                  type="text"
                  defaultValue={parsedValue.data.name.split(" ", 2)[1] || ""}
                  className="mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none focus:ring-2"
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
                  <label>Email</label>
                </b>
                <input
                  disabled
                  type="email"
                  defaultValue={parsedValue.data.email}
                  className="focus:ring-none not-allowed mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* Street Address */}
        <div className="mb-4 mt-4 grid grid-cols-4 items-start gap-4">
          <Heading xm className="col-span-1">
            Street address
          </Heading>

          <div className="col-span-2">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex flex-1 flex-col">
                <input
                  ref={streetAddressRef}
                  type="text"
                  defaultValue={parsedValue.data.customer_location}
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* City */}
        <div className="mb-4 mt-4 grid grid-cols-4 items-start gap-4">
          <Heading xm className="col-span-1">
            City
          </Heading>

          <div className="col-span-2">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex flex-1 flex-col">
                <input
                  ref={cityRef}
                  type="text"
                  defaultValue={parsedValue.data.city}
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* State/Province */}
        <div className="mb-4 mt-4 grid grid-cols-4 items-start gap-4">
          <Heading xm className="col-span-1">
            State/Province
          </Heading>

          <div className="col-span-2">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex flex-1 flex-col">
                <input
                  ref={stateRef}
                  type="text"
                  defaultValue={parsedValue.data.province}
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <input
                  type="text"
                  ref={areaCodeRef}
                  defaultValue={parsedValue.data.area_code || ""}
                  className="mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none focus:ring-2"
                />
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* Country */}
        <div className="mb-4 mt-4 grid grid-cols-4 items-start gap-4">
          <Heading xm className="col-span-1">
            Country
          </Heading>

          <div className="col-span-2">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex flex-1 flex-col">
                <input
                  ref={countryRef}
                  type="text"
                  defaultValue={parsedValue.data.country}
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 mt-4 grid grid-cols-4 items-start gap-4">
          <Heading xm className="col-span-1"></Heading>

          <div className="col-span-2">
            <ButtonCapsule className="w-[50%]" type="submit">
              Update Info
            </ButtonCapsule>
          </div>
        </div>
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

export default CandidateProfileForm;
