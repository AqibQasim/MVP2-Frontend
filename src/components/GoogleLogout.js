"use client";
import { signOutAction } from "@/lib/actions";
import SvgIconLogout from "@/svgs/SvgIconLogout";

function GoogleLogout({ className, userRole }) {

  return (
    <form action={async(formData)=>await signOutAction(userRole)}>
      <button
        className={`${className} group flex w-full cursor-pointer items-center justify-start gap-3 rounded-[0.625rem] bg-transparent px-4 py-3 font-lufga text-sm font-medium text-grey-primary-shade-20 transition-colors duration-200 hover:bg-primary-tint-100 hover:text-primary-tint-20`}
      >
        <SvgIconLogout className="size-6" />
        <span>Logout</span>
      </button>
    </form>
  );
}

export default GoogleLogout;
