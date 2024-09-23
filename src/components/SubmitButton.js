"use client";
import { useFormStatus } from "react-dom";
import ButtonCapsule from "./ButtonCapsule";

export default function SubmitButton({ children, className, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <ButtonCapsule className={`${className} `} disabled={pending}>
      {pending ? pendingLabel : children}
    </ButtonCapsule>
  );
}
