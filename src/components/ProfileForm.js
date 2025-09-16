"use client";
import React, { useRef, useState } from "react";
import Heading from "./Heading";
import ButtonCapsule from "./ButtonCapsule";
import ButtonRounded from "./ButtonRounded";
import Button from "./Button";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { usePathname, useRouter } from "next/navigation";
import ErrorPopup from "./ErrorPopup";
import ButtonBack from "./ButtonBack";
import "../styles/Setting.css";
import Modal from "@/components/AdminJobsFormModal";
import Image from "next/image";
import { countryList } from "@/utils/cities";

const ProfileForm = ({ client }) => {
  const router = useRouter();
  const pathname = usePathname();
  const client_id = pathname.split("/")[2];
  const [sucess, setsuccess] = useState(false);
  const [error, seterror] = useState(false);
  const [errors, setErrors] = useState({});
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  // const passwordRef = useRef(null);
  const locationRef = useRef(null);
  const cityRef = useRef(null);
  const phoneNumRef = useRef(null);
  const provinceRef = useRef(null);
  const areaCodeRef = useRef(null);
  const countryRef = useRef(null);
  const companyRef = useRef(null);

  const companySizeRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handClick = () => {
    setShow(!show);
  };
  const handClick2 = () => {
    setShow2(!show2);
  };

  console.log("client is", client);

  const submitHandler = async (e) => {
    e.preventDefault();

    // const newPassword = newPasswordRef.current.value;
    // const confirmPassword = confirmpasswordRef.current.value;

    // // Check for password length
    // if (newPassword.length < 8) {
    //   alert("Password must be at least 8 characters long.");
    //   return;
    // }

    // // Check if passwords match
    // if (newPassword !== confirmPassword) {
    //   alert("New Password and Confirm Password do not match.");
    //   return;
    // }

    // alert("Password validated successfully!");

    const payload = {
      endpoint: `client-profile-update/${client_id}`, // Use the client ID
      method: "PUT",
      body: {
        // firstName: firstNameRef.current.value,
        // lastName: lastNameRef.current.value,
        name: firstNameRef?.current.value + ' ' + lastNameRef?.current.value,
        password: newPasswordRef?.current?.value,
        // email: emailRef.current.value,
        //  password: passwordRef.current.value,
        contact_no: phoneNumRef?.current?.value,
        client_location: locationRef?.current?.value,
        city: cityRef?.current?.value,
        province: provinceRef.current.value,
        area_code:
          areaCodeRef.current?.value != "" ? areaCodeRef.current?.value : null,
        country: countryRef.current.value,
        company_name: companyRef.current.value,
        company_size: companySizeRef.current.value,
      },
    };

    try {
      const result = await mvp2ApiHelper(payload);
      if (result.status === 200) {
        console.log("Client info updated successfully", result.data);
        setsuccess(true);
        // refresh page on success
        router.refresh();
      } else {
        console.error("Error updating client info", result?.data?.message);
        seterror(true);
      }
    } catch (error) {
      console.error("Error while updating profile", error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const newPassword = newPasswordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();

    // Password validation rules
    if (newPassword.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: "Password must be at least 8 characters long.",
      }));
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: "Password must contain at least one uppercase letter.",
      }));
      return;
    }
    if (!/[a-z]/.test(newPassword)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: "Password must contain at least one lowercase letter.",
      }));
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: "Password must contain at least one number.",
      }));
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    // Clear previous errors
    setErrors({});

    const payload = {
      endpoint: `client-profile-update/${client_id}`,
      method: "PUT",
      body: {
        password: newPassword,
      },
    };

    try {
      const result = await mvp2ApiHelper(payload);
      if (result.status === 200) {
        console.log("Password updated successfully", result.data);
        setShowForm(false);
        setsuccess(true);
      } else {
        console.error("Error updating password", result?.data?.message);
        seterror(true);
      }
    } catch (error) {
      console.error("Error while updating password", error);
      seterror(true);
    }
  };

  //

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
                  defaultValue={client?.name?.split(" ", 2)[0] || ""}
                  type="text"
                  disabled
                  placeholder="First Name"
                  // className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                  className="focus:ring-none mt-1 cursor-not-allowed rounded-full border bg-gray-100 p-2 text-gray-400 focus:outline-none"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-1 flex-col">
                <b>
                  <label>Last Name</label>
                </b>
                <input
                  disabled
                  ref={lastNameRef}
                  defaultValue={client?.name?.split(" ", 2)[1] || ""}
                  type="text"
                  placeholder="Last Name"
                  // className="mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none focus:ring-2"
                  className="focus:ring-none mt-1 cursor-not-allowed rounded-full border bg-gray-100 p-2 text-gray-400 focus:outline-none"
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
                  defaultValue={client?.email || ""}
                  type="email"
                  placeholder="Email"
                  className="focus:ring-none mt-1 cursor-not-allowed rounded-full border bg-gray-100 p-2 text-gray-400 focus:outline-none"
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
                <b className="flex justify-between">
                  <label>Password</label>
                  <span
                    className="cursor-pointer text-blue-700"
                    onClick={() => setShowForm(true)}
                  >
                    Change Password
                  </span>
                </b>

                {/* <input
                  ref={confirmPasswordRef}
                  type="text"
                  placeholder="Confirm Password"
                  className="mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none focus:ring-2"
                /> */}
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
                  ref={phoneNumRef}
                  defaultValue={client?.contact_no || ""}
                  type="text"
                  placeholder="Phone Number"
                  className="mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none focus:ring-2"
                />
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="my-4 grid grid-cols-4 items-start gap-4">
          {/* Section Heading */}
          <Heading xm className="col-span-1">
            Company Details
          </Heading>

          {/* Input Group */}
          <div className="col-span-2">
            {/* First Name and Last Name Row */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              {/* First Name */}
              <div className="flex flex-1 flex-col">
                <b>
                  <label>Company Name</label>
                </b>
                <input
                  ref={companyRef}
                  defaultValue={client?.company_name || ""}
                  type="text"
                  placeholder="Company Name"
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-1 flex-col">
                <b>
                  <label>Company Size</label>
                </b>
                <select
                  name="company_size"
                  id="company_size"
                  placeholder="Company Size"
                  ref={companySizeRef}
                  className="mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none focus:ring-2"
                >
                  <option value="null">Company size</option>
                  <option
                    value="0-15"
                    selected={client?.company_size === "0-15" ? true : false}
                  >
                    {" "}
                    0-15{" "}
                  </option>
                  <option
                    value="16-50"
                    selected={client?.company_size === "16-50" ? true : false}
                  >
                    {" "}
                    16-50{" "}
                  </option>
                  <option
                    value="51-100"
                    selected={client?.company_size === "51-100" ? true : false}
                  >
                    {" "}
                    51-100
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
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
                  defaultValue={client?.client_location || ""}
                  type="text"
                  placeholder="Street Address"
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
                  defaultValue={client?.city || ""}
                  type="text"
                  placeholder="City"
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
                  placeholder="Province"
                  defaultValue={client?.province || ""}
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <input
                  type="number"
                  ref={areaCodeRef}
                  placeholder="Zip Code"
                  defaultValue={client?.area_code || ""}
                  className="no-arrows mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none focus:ring-2"
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
                <select
                  name="country"
                  ref={countryRef}
                  // id="country"
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                >
                  {/* <option value="" selected={client?.country}>
                    {" "}
                    {client?.country ? client?.country : "Select country"}{" "}
                  </option> */}
                  {!client?.country ? (
                    <option value="Select country"> Select country </option>
                  ) : null}
                  {countryList.map((country, i) => (
                    <option
                      key={i}
                      value={country}
                      selected={
                        client?.country &&
                          country.toLowerCase() === client?.country?.toLowerCase()
                          ? true
                          : false
                      }
                    >
                      {country}
                    </option>
                  ))}
                </select>
                {/* <input
                  type="text"
                  placeholder="Country"
                  ref={countryRef}
                  defaultValue={client?.country || ""}
                  className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 focus:outline-none"
                /> */}
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

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <form onSubmit={handlePasswordChange}>
          <div className="mt-4 grid grid-cols-4 items-start gap-4">
            {/* Section Heading */}
            <Heading xm className="col-span-1 mt-4">
              New Password:
            </Heading>
            {/* Input Group */}
            <div className="col-span-3">
              {/* First Name and Last Name Row */}
              <div className="flex flex-row">
                {/* First Name */}
                <div className="flex flex-1 flex-col">
                  <input
                    type={show ? "text" : "password"}
                    placeholder="New Password"
                    ref={newPasswordRef}
                    className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 text-gray-900 focus:outline-none"
                  />
                </div>
                <p className="relative bottom-2 right-[30px]">
                  {show ? (
                    <Image
                      src="/eye.svg"
                      width={20}
                      height={20}
                      alt="eye close"
                      onClick={handClick}
                      className="mt-[24px] inline-block cursor-pointer"
                    />
                  ) : (
                    <Image
                      src="/eye-close.svg"
                      width={20}
                      height={20}
                      alt="eye open"
                      onClick={handClick}
                      className="mt-[24px] inline-block cursor-pointer"
                    />
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 items-start gap-4">
            {/* Section Heading */}
            <Heading xm className="col-span-1 mt-4">
              Confirm Password:
            </Heading>
            {/* Input Group */}
            <div className="col-span-3">
              {/* First Name and Last Name Row */}
              <div className="flex flex-row">
                {/* First Name */}
                <div className="flex flex-1 flex-col">
                  <input
                    type={show2 ? "text" : "password"}
                    placeholder="Confirm Password"
                    ref={confirmPasswordRef}
                    className="focus:ring-none mt-1 rounded-full border bg-gray-100 p-2 text-gray-900 focus:outline-none"
                  />
                </div>

                <p className="relative bottom-2 right-[30px]">
                  {show2 ? (
                    <Image
                      src="/eye.svg"
                      width={20}
                      height={20}
                      alt="eye close"
                      onClick={handClick2}
                      className="mt-[24px] inline-block cursor-pointer"
                    />
                  ) : (
                    <Image
                      src="/eye-close.svg"
                      width={20}
                      height={20}
                      alt="eye open"
                      onClick={handClick2}
                      className="mt-[24px] inline-block cursor-pointer"
                    />
                  )}
                </p>
              </div>
            </div>
          </div>

          <p className="text-red-600">{errors?.newPassword}</p>
          <p className="text-red-600">{errors?.confirmPassword}</p>

          <div className="mt-12 flex justify-center">
            <button
              type="submit"
              className="rounded-full bg-blue-500 px-4 py-2 text-white"
            >
              Save Password
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="ml-2 rounded-full bg-gray-300 px-10 py-2 text-center"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

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
