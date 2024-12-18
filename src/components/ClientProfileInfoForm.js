"use client";
import { updateClientProfileAction } from "@/lib/actions";
import { useParams } from "next/navigation";
import { useState } from "react";
import EntityCard from "./EntityCard";
import Heading from "./Heading";
import Hr from "./Hr";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

function ClientProfileInfoForm({ clientName, clientEmail }) {
  const [error, setError] = useState(null);
  const params = useParams();
  const clientId = params.clientId;

  async function handleProfileUpdate(formData) {
    const { error, message } = await updateClientProfileAction(formData);
    // console.log("update client profile message ", message);
    if (error) {
      console.log(error);
      return setError(error);
    }
    // if (message) return onCloseModal();
    if (message) return;
  }

  return (
    <>
      <Heading xm>Additional info</Heading>
      <Hr />
      <EntityCard
        entity={{
          image: "/avatars/avatar-2.png",
          name: clientName || "Richard Feynman",
          profession: clientEmail || "richardfeynman@gmail.com",
        }}
      ></EntityCard>
      <form action={handleProfileUpdate} className="mt-6 space-y-4.5">
        <input
          type="text"
          hidden
          name="clientId"
          id="clientId"
          value={clientId}
        />
        <div className="row space-y-2">
          <label
            htmlFor="company_name"
            className="text-sm font-medium capitalize"
          >
            Company name
          </label>
          <Input
            name="company_name"
            id="company_name"
            type="text"
            required={false}
            placeholder="Company name"
          />
        </div>
        <SelectElement
          required
          label="company size"
          options={["0-15", "16-50", "51-100"]}
        />

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

export default ClientProfileInfoForm;

function SelectElement({ label, options, ...rest }) {
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
        className="block w-full rounded-[40px] border border-primary-tint-90 p-3 font-lufga text-sm font-normal capitalize focus:border-primary focus:!outline-none focus:ring-primary"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
