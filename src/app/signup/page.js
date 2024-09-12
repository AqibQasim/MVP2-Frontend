"use client";
import Heading from "@/components/Heading";
import Input from "@/components/Input";
import OnBoardingButton from "@/components/OnBoardingButton";
import Overlay from "@/components/Overlay";
import SuccessModal from "@/components/SuccessModal";
import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { PAGE_HEIGHT_FIX } from "@/utils/utility";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

function SignUp() {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [user_role, setUserRole] = useState("client");
  const [errors, setErrors] = useState({});

  const payload = useMemo(
    () => ({
      endpoint: "signup",
      method: "POST",
      body: {
        email: form.email,
        name: form.firstName + " " + form.lastName,
        password: form.password,
        user_role,
        method: "signup",
      },
    }),
    [form, user_role],
  );

  const handleSignup = useCallback(
    async (event) => {
      event.preventDefault();
      if (Object.values(errors).some((err) => err !== "")) {
        return; // Do not proceed with signup if there are validation errors
      }
      //console.log(payload);
      const result = await mvp2ApiHelper(payload);
      console.log(result)
      if (result.status === 200) {
        console.log("signed up successfully");
        // const revalidatePath = await revalidate("/admin/clients");
        // console.log("revalidate path", revalidatePath);
        setOverlayVisible(true);
      }
    },
    [payload, errors,user_role],
  );

  const handleOpenOverlay = () => {
    if (Object.values(errors).every((err) => err === "")) {
      setOverlayVisible(true);
    }
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Real-time validation
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "firstName":
        if (!/^[A-Za-z]+$/.test(value)) {
          errorMsg = "Invalid Firstname";
        }
        break;
      case "lastName":
        if (!/^[A-Za-z]+$/.test(value)) {
          errorMsg = "Invalid Lastname";
        }
        break;
      case "email":
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)) {
          errorMsg = "Invalid email address";
        }
        break;
      case "password":
        if (!/^.{8,}$/.test(value)) {
          errorMsg = "Password must be at least 8 characters";
        }
        break;
      case "confirmPassword":
        if (value !== form.password) {
          errorMsg = "Passwords do not match";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const mainHeading = (
    <span>
      Enter verification{" "}
      <span
        style={{
          backgroundImage: "linear-gradient(to right, #4624E0, white)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline",
        }}
      >
        Code.
      </span>
    </span>
  );
  let text = (
    <>
      We&apos;ve sent a code to{" "}
      <span className="font-semibold">{form.email}</span>
    </>
  );

  return (
    <>
      <div className={`flex ${PAGE_HEIGHT_FIX} gap-2`}>
        <div className="flex flex-[1.4] flex-col items-center justify-center rounded-[36px] bg-white">
          <Heading className="text-5xl font-extrabold text-primary">
            Interactive <span className="gradient-text">Illustration</span>
          </Heading>
        </div>

        <div className="flex w-[33rem] flex-col items-start justify-start rounded-[36px] bg-white">
          <div className="flex w-full justify-between space-y-2 p-5">
            <Image src="/logo.svg" width={100} height={25} alt="MVP 2 Logo" />
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  //e.preventDefault();
                  setUserRole("client");
                }}
                className={`rounded-full border-[1px] ${user_role === "client" ? "border-primary bg-primary-tint-100 px-7 py-2 text-[#070416]" : "bg-primary-tint-100 px-7 py-2 text-[#ACA6C8]"}`}
              >
                Client
              </button>
              <button
                onClick={(e) => {
                  //e.preventDefault();
                  setUserRole("customer");
                }}
                className={`rounded-full border-[1px] ${user_role === "customer" ? "border-primary bg-primary-tint-100 px-7 py-2 text-[#070416]" : "bg-primary-tint-100 px-7 py-2 text-[#ACA6C8]"}`}
              >
                Freelancer
              </button>
            </div>
          </div>
          <div className="mx-auto mt-3 w-8/12 flex-grow">
            <h2 className="text-start font-lufga text-2xl">
              A sentence of perks and encouragement for{" "}
              <span className="gradient-text">freelancer.</span>
              <Image
                src="/icons/clients_emoji.png"
                width={100}
                height={100}
                alt="Clients Emoji"
                className="inline-block"
              />
            </h2>

            <div className="mt-5 flex gap-2">
              <Input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="mt-3"
              />

              <Input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="mt-3"
              />
            </div>

            <div className="flex gap-2">
              <div>
                {errors.firstName && (
                  <p className="text-xs text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div>
                {errors.lastName && (
                  <p className="text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <Input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="mt-3"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}

            <div className="flex gap-2">
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="mt-3"
              />
              <Input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="mt-3"
              />
            </div>
            <div className="flex gap-2">
              <div>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>
              <div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-2 w-full text-start">
              <input type="checkbox" className="border-none outline-none" />
              <span className="ms-2 text-sm text-grey-primary">
                I read and accept the{" "}
              </span>
              <button className="text-sm text-primary">
                Terms and Conditions
              </button>
            </div>
            <OnBoardingButton onClick={handleSignup}>
              Create account
            </OnBoardingButton>
            <div className="my-1 w-full text-center text-grey-primary-tint-30">
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
            <button className="text-md w-full rounded-full border-[1px] bg-white px-4 py-2 font-semibold text-black shadow-md">
              <Image
                src="google.svg"
                width={20}
                height={20}
                alt="Google"
                className="inline-block"
              />{" "}
              Continue with Google
            </button>
          </div>
        </div>
      </div>
      {isOverlayVisible && (
        <Overlay>
          <SuccessModal
            heading={mainHeading}
            text={text}
            onClose={handleCloseOverlay}
          />
        </Overlay>
      )}
    </>
  );
}

export default SignUp;
