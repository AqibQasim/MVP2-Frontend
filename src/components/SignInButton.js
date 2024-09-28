import { signInAction } from "@/lib/actions";
import Image from "next/image";

function SignInButton({ user_role }) {
  async function handleGoogleSignIn() {
    await signInAction(user_role);
  }
  return (
    <form action={handleGoogleSignIn}>
      <button className="text-md w-full rounded-full border-[1px] bg-white px-4 py-2 text-center text-primary-tint-20">
        <Image
          src="google.svg"
          width={23}
          height={20}
          alt="google Logo"
          className="inline-block"
        />
        Sign in with Google
      </button>
    </form>
  );
}

export default SignInButton;
