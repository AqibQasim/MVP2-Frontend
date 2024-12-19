"use client";
// import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

function PhoneInputEl({ className, phone, setPhone, setCountry }) {
  // const [phone, setPhone] = useState("");

  function handlePhoneChange() {}

  return (
    <div>
      <PhoneInput
        className={`${className} block w-full rounded-full border border-gray-300 px-3 py-[0.15rem] text-gray-900 transition-colors duration-300 ease-in-out placeholder:text-xs focus:border-primary focus:!outline-none focus:ring-primary`}
        inputClassName="!border-none !w-full"
        countrySelectorStyleProps={{
          buttonClassName: "!border-none hover:!bg-transparent",
        }}
        defaultCountry="pk"
        value={phone}
        onChange={(phone,{country}) => {
          setCountry(country.name)
          setPhone(phone)}}
        // value={phone}
        // onChange={(phone) => setPhone(phone)}
      />
    </div>
  );
}

export default PhoneInputEl;
