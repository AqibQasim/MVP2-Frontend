import Image from "next/image";
import MyCalendar from "./MyCalender";
import SelectTime from "./SelectTime";
import ActionButtons from "./ActionButtons";
import Avatar from "./Avatar";
import UserProfileTab from "./UserProfileTab";
import { useState } from "react";


const InterViewScheduler = ({ onSuccessAck, onClose }) => {
    const [isContinued, setIsContinued] = useState(false);

    const handleScheduleInterview = () => {
        setIsContinued(!isContinued);
    }

    return (
        <>
            <div className="w-[40%] max-h-[90vh] overflow-y-auto relative bg-white px-6 py-3 rounded-[2rem] shadow-2xl custom-scrollbar">
                <div className="w-[100%] flex flex-col items-center">
                    <div className="w-[95%] flex flex-col">
                        {isContinued ? (
                            <>
                                <h2 className="text-xl font-bold font-lufga pb-3">Your interview has been scheduled successfully send</h2>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold font-lufga pb-3">Schedule An Interview</h2>
                            </>
                        )}


                        {isContinued && <span className="text-[0.8rem] mb-[0.5rem] font-lufga text-grey-primary-shade-30">
                            Your interview with Sohaib has been successfully scheduled. Please find the details below:
                        </span>}


                        <div className="flex items-center w-[100%] mb-[0.5rem] gap-[1rem]">
                            <Avatar src="/avatars/avatar-1.png" alt="an avatar image" />
                            <UserProfileTab name="Sohaib" designation="Account Executive - AE" />
                        </div>

                        {isContinued && <span className="text-[0.8rem] my-[1rem] font-lufga text-grey-primary-shade-30">
                            Interview has been scheduled with <span className="font-bold">Sohaib</span>.
                        </span>}

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
                            <ActionButtons onSuccessAck={onSuccessAck} onClose={onClose} isContinued={isContinued} onScheduleInterview={handleScheduleInterview} onBackClick={onClose} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InterViewScheduler;