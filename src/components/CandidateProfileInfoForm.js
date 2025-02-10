"use client";
import { updateCandidateProfileAction } from "@/lib/actions";
import { citiesList, countryList } from "@/utils/cities";
import { useParams } from "next/navigation";
import { useState } from "react";
import EntityCard from "./EntityCard";
import Heading from "./Heading";
import Hr from "./Hr";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

function CandidateProfileInfoForm({ candidate }) {
  const [error, setError] = useState(null);
  const [tempCountry, setTempCountry] = useState("");
  const params = useParams();
  const candidateId = params.candidateId;
  // const { data: candidate } = await getCandidate(candidateId);

  async function handleProfileUpdate(formData) {
    const { error, message } = await updateCandidateProfileAction(formData);
    if (error) {
      console.log(error);
      return setError(error);
    }
    if (message) return onCloseModal();
  }

  function handlepecialization(e) {
    setSpecialization(e.target.value);
  }

  return (
    <>
      <Heading xm>Additional info</Heading>
      <Hr />
      <EntityCard
        entity={{
          image: "/avatars/avatar-2.png",
          name: candidate?.name || "Richard Feynman",
          profession: candidate?.email || "richardfeynman@gmail.com",
        }}
      ></EntityCard>
      <form action={handleProfileUpdate} className="mt-6 space-y-4.5">
        <input
          type="text"
          hidden
          name="candidateId"
          id="candidateId"
          value={candidateId}
        />
        <SelectElement
          required
          label="experience"
          options={["beginner", "intermediate", "expert"]}
        />
        <SelectElement
          required
          label="commitment"
          options={["full-time", "part-time"]}
        />
        <SelectElement
          required
          label="country"
          placeholder={"Select country"}
          options={countryList}
          onChange={(e) => setTempCountry(e.target.value)}
        />
        <SelectElement
          disabled={!tempCountry}
          required
          label="city"
          options={tempCountry ? citiesList[tempCountry] || ["Empty"] : []}
        />
        <div className="row space-y-2">
          <label
            htmlFor="specialization"
            className="text-sm font-medium capitalize"
          >
            Specialization
          </label>
          <Input
            id="specialization"
            name="specialization"
            placeholder="Back-end developer"
            required={false}
          />
        </div>
        <div className="row space-y-2">
          <label
            htmlFor="hourly_rate"
            className="text-sm font-medium capitalize"
          >
           what&apos;s your hourly rate ($)
          </label>
          <Input
            name="hourly_rate"
            id="hourly_rate"
            type="number"
            required={false}
            placeholder="8"
          />
        </div>

        {error ? (
          <div className="error">
            <p className="text-red-500"> {error} </p>
          </div>
        ) : null}

        <div className="flex items-center justify-end gap-1.5">
          <SubmitButton
            className="!justify-between gap-36"
            pendingLabel="Updating..."
          >
            Confirm
          </SubmitButton>
        </div>
      </form>
    </>
  );
}

export default CandidateProfileInfoForm;

function SelectElement({ label, options, placeholder, ...rest }) {
  return (
    <div className="row space-y-2">
      {label ? (
        <label htmlFor={label} className="text-sm font-medium capitalize">
          {label}
        </label>
      ) : null}
      <select
        id={label}
        name={label}
        {...rest}
        className="block w-full rounded-[40px] border border-primary-tint-90 p-3 font-lufga text-sm font-normal capitalize"
      >
        {placeholder ? (
          <option selected value={placeholder}>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
