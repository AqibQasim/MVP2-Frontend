import Heading from "@/component/Heading"

export const metadata = {
    title: "Login",
};

function Login() {
    return (
        <>
       <div className="h-screen flex gap-2">
                <div className="flex-[1.4] bg-white h-5/6 rounded-[36px] flex flex-col items-center justify-center">
                    <Heading className="text-primary text-5xl font-extrabold">
                        Intera<span className="text-primary-tint-60">ctive</span>
                    </Heading>
                    <Heading className="text-primary text-5xl font-extrabold">
                        Illust<span className="text-primary-tint-60">ration</span>
                    </Heading>
                </div>
                
                <div className="flex-[1] bg-white h-5/6 rounded-[36px] flex flex-col items-center justify-center">
                    <Heading className="text-primary bg-primary-to-r from-primary-500 font-extrabold">
                        Form
                    </Heading>
                </div>
            </div>
        </>
    )
}

export default Login
