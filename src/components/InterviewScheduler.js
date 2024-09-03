import Image from "next/image";
import MyCalendar from "./MyCalender";
import SelectTime from "./SelectTime";
import ActionButtons from "./ActionButtons";
import Avatar from "./Avatar";
import UserProfileTab from "./UserProfileTab";


const InterViewScheduler = async ({ onClose }) => {

    return (
        <>
            <div className="w-[100%] flex flex-col items-center">
                <div className="w-[95%] flex flex-col  ">
                    <div className="flex items-center w-[100%] mb-[0.5rem] gap-[1rem]">
                        <Avatar src="/avatars/avatar-1.png" alt="an avatar image" />
                        <UserProfileTab name="Sohaib" designation="Account Executive - AE" />
                    </div>

                    {/* <span className="text-[0.8rem] my-[1rem] font-lufga text-grey-primary-shade-30">
                        Interview has been scheduled with <span className="font-bold">Sohaib</span>.
                    </span> */}


                    <div className="flex w-[100%] gap-[1rem] mb-[0.25rem] justify-between items-center bg-primary-tint-100  rounded-full">
                        <div className="flex gap-[1rem] items-center p-1">
                            <Avatar src="/avatars/avatar-1.png" alt="an avatar image" />
                            <UserProfileTab name="Sohaib" designation="Software Engineer" />

                        </div>

                        <div className="flex gap-[0.2rem] items-center font-lufga p-4">
                            <Image src='/icons/internet.svg' width={20} height={20} alt="Internet icon" />
                            <p className="text-grey-primary-shade-30 font-medium text-[0.8rem]">Asia/Karachi</p>
                        </div>
                    </div>

                    <div>
                        <span className="text-[0.8rem] font-bold">Time</span>
                        <SelectTime />
                    </div>

                    <div >
                        <span className="text-[0.8rem] font-bold">Date</span>
                        <div className="border-[1px] mt-[0.25rem] h-[100%] border-primary-tint-90 rounded-3xl p-2">
                            <MyCalendar />
                        </div>
                    </div>

                    <div className="w-[100%] mt-[0.5rem]">
                        <ActionButtons onBackClick={onClose} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default InterViewScheduler;