import React, { useState, useRef, useEffect } from "react";
import Heading from "./Heading";
import ButtonCapsule from "./ButtonCapsule";
import ButtonBack from "./ButtonBack";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import ErrorPopup from "./ErrorPopup";
// import { useEffect } from "react/cjs/react.production.min";
import "../styles/Setting.css";

const CandidateProfileForm = ({ candidate }) => {
  console.log(candidate);

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
  const phoneRef = useRef(null);
  // const companySizeRef = useRef(null);
  // const companyRef = useRef(null);

  useEffect(() => {
    console.log("the parsed customer id is ", candidate?.data?.customer_id);
  }, [candidate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      endpoint: `profile-info-update/${candidate?.data?.customer_id}`,
      method: "PUT",
      body: {
        name: firstNameRef?.current.value+' '+lastNameRef?.current.value,
        customer_location: streetAddressRef?.current.value,
        city: cityRef?.current.value,
        province: stateRef?.current.value,
        area_code:
          areaCodeRef.current?.value != "" ? areaCodeRef.current?.value : null,
        country: countryRef?.current.value,
        contact_no: phoneRef?.current.value,
        // companyName: companyRef.current.value,
        // companySize: companySizeRef.current.value,
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
                  placeholder="First Name"
                  defaultValue={candidate?.data?.name?.split(" ", 2)[0] || ""}
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
                  placeholder="Last Name"
                  defaultValue={candidate?.data?.name?.split(" ", 2)[1] || ""}
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
                  defaultValue={candidate?.data?.email}
                  className="focus:ring-none mt-1 cursor-not-allowed rounded-full border bg-gray-100 p-2 focus:outline-none"
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
                  <label>Phone Number</label>
                </b>
                <input
                  ref={phoneRef}
                  defaultValue={candidate?.data?.contact_no}
                  type="text"
                  placeholder="Phone Number"
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
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
                  placeholder="Street Adress"
                  defaultValue={candidate?.data?.customer_location}
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
                  placeholder="City"
                  defaultValue={candidate?.data?.city}
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
                  defaultValue={candidate?.data?.province}
                  placeholder="State"
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <input
                  type="number"
                  ref={areaCodeRef}
                  placeholder="Zip Code"
                  defaultValue={candidate?.data?.area_code || ""}
                  className="no-arrows mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none focus:ring-2"
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
                  placeholder="Country"
                  defaultValue={candidate?.data?.country}
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 mt-8 grid grid-cols-4 items-start gap-3">
          {/* Section Heading */}
          <Heading xm className="col-span-1"></Heading>

          <div className="col-span-2">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              {/* First Name */}
              <div className="flex flex-1 flex-col" style={{ flex: "0 0 27%" }}>
                <ButtonBack className="py-[7px]">back</ButtonBack>
              </div>

              <div className="flex flex-col" style={{ flex: "0 0 70%" }}>
                <ButtonCapsule className="" type="submit">
                  Update Info
                </ButtonCapsule>
              </div>
            </div>
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
