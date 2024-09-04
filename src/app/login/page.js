import Heading from "@/components/Heading";

export const metadata = {
  title: "Login",
};

function Login() {
  return (
    <>
      <div className="flex h-screen gap-2">
        <div className="flex h-5/6 flex-[1.4] flex-col items-center justify-center rounded-[36px] bg-white">
          <Heading className="text-5xl font-extrabold text-primary">
            Intera<span className="text-primary-tint-60">ctive</span>
          </Heading>
          <Heading className="text-5xl font-extrabold text-primary">
            Illust<span className="text-primary-tint-60">ration</span>
          </Heading>
        </div>

        <div className="flex h-5/6 flex-[1] flex-col items-center justify-center rounded-[36px] bg-white">
          <Heading className="bg-primary-to-r from-primary-500 font-extrabold text-primary">
            Form
          </Heading>
        </div>
      </div>
    </>
  );
}

export default Login;
