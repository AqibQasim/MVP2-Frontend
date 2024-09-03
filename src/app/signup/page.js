import Heading from "@/components/Heading";
import Image from "next/image";
import Input from "@/components/Input";
import OnBoardingButton from "@/components/OnBoardingButton";
import { PAGE_HEIGHT_FIX } from "@/utils/utility";

export const metadata = {
  title: "Sign Up",
};

function SignUp() {
  return (
    <>
      <div className={`flex ${PAGE_HEIGHT_FIX} gap-2`}>
        <div className="flex flex-[1.4] flex-col items-center justify-center rounded-[36px] bg-white">
          <Heading className="text-5xl font-extrabold text-primary">
            Interactive <span className="gradient-text">Illustration</span>
          </Heading>
        </div>

        <div className="flex w-[33rem] flex-col items-start justify-start rounded-[36px] bg-white">
          {/* <Heading className="text-primary bg-primary-to-r from-primary-500 font-extrabold"></Heading> */}

          <div className="flex w-full justify-between space-y-2 p-5">
            <Image src="/logo.svg" width={100} height={25} alt="MVP 2 Logo" />
            <div className="flex gap-2">
              <button className="rounded-full border-[1px] border-primary bg-primary-tint-100 px-7 py-2 text-[#070416]">
                Client
              </button>
              <button className="rounded-full bg-primary-tint-100 px-7 py-2 text-[#ACA6C8]">
                Freelancer
              </button>
              {/* <Button className="rounded-full bg-primary-tint-100 text-[#070416] border-2 border-primary">Client</Button>
                        <Button className="rounded-full bg-primary-tint-100 text-[#ACA6C8]">Freelancer</Button> */}
            </div>
          </div>
          <div className="mx-auto mt-20 w-10/12  ">
            <h2 className="text-start font-lufga lg:text-4xl md:text-2xl">
              A sentence of perks and encouragement for{" "}
              <span className=" gradient-text">freelancer.</span>
              <Image
                src="/icons/clients_emoji.png"
                width={100}
                height={100}
                alt="Clients Emoji"
                className="inline-block"
              />
            </h2>

            <div className="flex gap-2 mt-5">
            <Input
              type="text"
              placeholder="First name"
              className="mt-3"
            />
             <Input
              type="text"
              placeholder="Last name"
              className="mt-3"
            />
            </div>

            <Input
              type="text"
              placeholder="Enter email"
              className="mt-3"
            />
            <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Enter password"
              className="mt-3"
            />
             <Input
              type="password"
              placeholder="Confirm password"
              className="mt-3"
            />
            </div>
            <div className="mt-2 w-full text-start">
            <input type="checkbox" className="border-none outline-none" /><span className="text-sm  text-grey-primary ms-2">I read and accept the </span><button className="text-sm text-primary">Terms and Condition</button>
            </div>
            <OnBoardingButton>Create account</OnBoardingButton>
            <div className="my-3 w-full text-center text-grey-primary-tint-30 ">
              <div className="flex items-center justify-center gap-2">
                <Image
                  src="line.svg"
                  width={20}
                  height={20}
                  alt="line"
                  className="inline-block"
                />
                <span>Or</span>
                <Image
                  src="line.svg"
                  width={20}
                  height={20}
                  alt="line"
                  className="inline-block"
                />
              </div>
            </div>
            <button className="text-md w-full rounded-full border-[1px] bg-white px-4 py-2 text-center text-primary-tint-20">
              {" "}
              <Image
                src="google.svg"
                width={23}
                height={20}
                alt="google Logo"
                className="inline-block"
              />{" "}
              Sign in with Google
            </button>
            <div className="mt-2">
              <p className="me-1 inline-block text-xs text-grey-primary">
                Already have an account?
              </p>
              <button className="text-xs text-primary underline">
            Login now
              </button>
            </div>
          </div>
          <div className="mt-auto align-end text-start text-xs text-grey-primary py-5 px-7">
          <Image
                src="icons/info_icon.svg"
                width={14}
                height={14}
                alt="info icon"
                className="inline-block "
              />
              <p className="inline-block ms-1">
               You’re registering as client, but you can also switch to
              freelancer later from settings.
              </p>
            
            </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
