"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Heading from "@/components/Heading";
import OnBoardingButton from "@/components/OnBoardingButton";

function Page({ params }) {
  const router = useRouter();
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  
  const handClick = () => {
    setShow(!show);
  };
  const handClick2 = () => {
    setShow2(!show2);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/password-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: decodedEmail,
            new_password: password,
            user_role: "client",
          }),
        },
      );

      if (res.ok) {
        setSuccess("Password reset successful! Redirecting to login...");
        setTimeout(() => router.push("/company-login"), 3000);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to reset password");
      }
    } catch (err) {
      setError("Something went wrong, please try again");
    }
  };

  return (
    <div className="reset-password-container">
       <Image src="/logo.svg" width={100} height={25} alt="MVP 2 Logo" />
         <div className="mt-3  ">
                    <h2 className="text-start font-lufga text-2xl">
                      A sentence of perks and encouragement for{" "}
                      <span className="gradient-text">freelancer.</span></h2>
                      <div className="flex justify-end" >
                      <Image
                        src="/icons/clients_emoji.png"
                        width={100}
                        height={100}
                        alt="Clients Emoji"
                        className="inline-block "
                      />
                      </div>
                   
         </div>  
      <Heading sm className="text-center my-5" >Change Password</Heading> 
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div >
          <label>New Password</label>
          <div className="flex"  >
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className=" rounded-full"
          />
           <p className="ml-[-37px]">
                              {show ? (
                                <Image
                                  src="/eye.svg"
                                  width={20}
                                  height={20}
                                  alt="eye open"
                                  onClick={handClick}
                                  className="mt-[11px] inline-block cursor-pointer"
                                />
                              ) : (
                                <Image
                                  src="/eye-close.svg"
                                  width={20}
                                  height={20}
                                  alt="eye close"
                                  onClick={handClick}
                                  className="mt-[11px] inline-block cursor-pointer"
                                />
                              )}
                            </p>  </div>
        </div>
        <div>
          <label>Confirm Password</label>
          <div className="flex"  >
          <input
            type={show2 ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className=" rounded-full"
          />
           <p className="ml-[-37px]">
                              {show2 ? (
                                <Image
                                  src="/eye.svg"
                                  width={20}
                                  height={20}
                                  alt="eye close"
                                  onClick={handClick2}
                                  className="mt-[11px] inline-block cursor-pointer"
                                />
                              ) : (
                                <Image
                                  src="/eye-close.svg"
                                  width={20}
                                  height={20}
                                  alt="eye open"
                                  onClick={handClick2}
                                  className="mt-[11px] inline-block cursor-pointer"
                                />
                              )}
                            </p> </div>
        </div>
        <OnBoardingButton
                type="submit"
              >
                Reset Password
              </OnBoardingButton>
      
      </form>
      <style jsx>{`
        .reset-password-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 12px;
           box-shadow: 2px 2px 10px lightblue;
          
        }
        .error {
          color: red;
        }
        .success {
          color: green;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        input {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}
export default Page;
