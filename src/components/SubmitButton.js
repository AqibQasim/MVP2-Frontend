"use client";
import { useFormStatus } from "react-dom";
import ButtonCapsule from "./ButtonCapsule";

export default function SubmitButton({ children, className, pendingLabel, isDisabled= false }) {
  const { pending } = useFormStatus();

  return (
    <ButtonCapsule className={`${className} `} disabled={isDisabled}>
      {pending ? pendingLabel : children}
    </ButtonCapsule>
  );
}
