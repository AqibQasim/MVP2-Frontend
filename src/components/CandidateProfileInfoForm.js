import { updateCandidateProfileAction } from "@/lib/actions";
import ButtonBack from "./ButtonBack";
import ButtonCapsule from "./ButtonCapsule";
import EntityCard from "./EntityCard";
import Heading from "./Heading";
import Hr from "./Hr";
import Input from "./Input";

function CandidateProfileInfoForm({ onCloseModal, candidateId }) {
  return (
    <>
      <Heading xm>Additional info</Heading>
      <Hr />
      <EntityCard
        entity={{
          image: "/avatars/avatar-1.png",
          name: "Richard Feynman",
          profession: "richardfeynman@gmail.com",
        }}
      ></EntityCard>
      <form action={updateCandidateProfileAction} className="mt-6 space-y-4.5">
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
        <div className="row space-y-2">
          <label htmlFor="position" className="text-sm font-medium capitalize">
            Specialization
          </label>
          <Input
            id="position"
            name="position"
            placeholder="Back-end developer"
          />
        </div>
        <div className="row space-y-2">
          <label
            htmlFor="hourly_rate"
            className="text-sm font-medium capitalize"
          >
            hourly rate ($)
          </label>
          <Input
            name="hourly_rate"
            id="hourly_rate"
            type="number"
            placeholder="8"
          />
        </div>
        <div className="flex items-center justify-end gap-1.5">
          <ButtonBack
            type="button"
            onClick={() => onCloseModal()}
            className="flex-[40%] !justify-start text-sm font-bold"
          >
            Close
          </ButtonBack>
          <ButtonCapsule className="flex-[50%] !justify-between">
            Confirm
          </ButtonCapsule>
        </div>
      </form>
    </>
  );
}

export default CandidateProfileInfoForm;

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
        className="block w-full rounded-[40px] border border-primary-tint-90 p-3 font-lufga text-sm font-normal capitalize"
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
