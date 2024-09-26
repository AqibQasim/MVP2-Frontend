"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import placeholderBlurBg from "../../public/placeholder-blur-bg.png";
import CandidateProfileInfoForm from "./CandidateProfileInfoForm";

function CandidateProfileInfo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Wrap />
      createPortal(
      <div className="body-scroll fixed inset-0 z-50 overflow-y-auto bg-black/5 backdrop-blur-md transition-all">
        <div className="flex min-h-screen items-center justify-center px-4 py-8">
          <div className="relative w-full max-w-lg rounded-4xl bg-white p-8 shadow-[0px_12px_48px_rgba(30,16,97,0.20)]">
            {/* Content */}
            <CandidateProfileInfoForm />
          </div>
        </div>
      </div>
      , document.body, );
    </>
  );
}

export default CandidateProfileInfo;

function Wrap({ children }) {
  return (
    <div className="relative size-full min-h-screen">
      <Image
        src={placeholderBlurBg}
        alt="Placeholder blur bg "
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placehoder="blur"
        quality={90}
      />
    </div>
  );
}
