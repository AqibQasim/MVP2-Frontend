import { signInAction } from "@/lib/actions";
import Image from "next/image";

function   SignInButton({ user_role }) {
  return (
    <form action={signInAction}>
      <input type="hidden" name="user_role" id="user_role" value={user_role} />
      <button className="text-md w-full rounded-full border-[1px] bg-white hover:bg-slate-100 px-4 py-2 text-center text-primary-tint-20">
        <Image
          src="google.svg"
          width={23}
          height={20}
          alt="google Logo"
          className="inline-block"
        />
        Continue with Google
      </button>
    </form>
  );
}

export default SignInButton;
