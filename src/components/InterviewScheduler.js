import Image from "next/image";
import MyCalendar from "./MyCalender";
import SelectTime from "./SelectTime";
import ActionButtons from "./ActionButtons";
import Avatar from "./Avatar";
import UserProfileTab from "./UserProfileTab";
import { useState } from "react";

const InterViewScheduler = async ({ onSuccessAck, onClose }) => {
  const [isContinued, setIsContinued] = useState(false);

  const handleScheduleInterview = () => {
    setIsContinued(!isContinued);
  };

  return (
    <>
      <div className="custom-scrollbar relative max-h-[90vh] w-[100%] overflow-y-auto rounded-[2rem] bg-white px-6 py-3 shadow-2xl">
        <div className="flex w-[100%] flex-col items-center">
          <div className="flex w-[95%] flex-col">
            {/* {isContinued ? ( */}
            {/* <> */}
            {/* <h2 className="text-xl font-bold font-lufga pb-3">Your interview has been scheduled successfully send</h2> */}
            {/* </> */}
            {/* ) : ( */}
            <>
              <h2 className="pb-3 font-lufga text-xl font-bold">
                Schedule A Call
              </h2>
            </>
            {/* )} */}

            {/* {isContinued && <span className="text-[0.8rem] mb-[0.5rem] font-lufga text-grey-primary-shade-30">
                            Your interview with Sohaib has been successfully scheduled. Please find the details below:
                        </span>} */}
            <div className="mb-[0.5rem] flex w-[100%] items-center gap-[1rem]">
              <Avatar src="/avatars/avatar-2.png" alt="an avatar image" />
              <UserProfileTab
                name="Sohaib"
                designation="Account Executive - AE"
              />
            </div>

            {/* {isContinued && <span className="text-[0.8rem] my-[1rem] font-lufga text-grey-primary-shade-30">
                            Interview has been scheduled with <span className="font-bold">Sohaib</span>.
                        </span>} */}

            <div className="mb-[0.25rem] flex w-[100%] items-center justify-between gap-[1rem] rounded-full bg-primary-tint-100">
              <div className="flex items-center gap-[1rem] p-1">
                <Avatar src="/avatars/avatar-2.png" alt="an avatar image" />
                <UserProfileTab name="Sohaib" designation="Software Engineer" />
              </div>

              <div className="flex items-center gap-[0.2rem] p-4 font-lufga">
                <Image
                  src="/icons/internet.svg"
                  width={20}
                  height={20}
                  alt="Internet icon"
                />
                <p className="text-[0.8rem] font-medium text-grey-primary-shade-30">
                  Asia/Karachi
                </p>
              </div>
            </div>

            <div>
              <span className="text-[0.8rem] font-bold">Time</span>
              <SelectTime />
            </div>

            <div>
              <span className="text-[0.8rem] font-bold">Date</span>
              <div className="mt-[0.25rem] h-[100%] rounded-3xl border-[1px] border-primary-tint-90 p-2">
                <MyCalendar />
              </div>
            </div>

            <div className="mt-[0.5rem] w-[100%]">
              <ActionButtons
                onSuccessAck={onSuccessAck}
                onClose={onClose}
                isContinued={isContinued}
                onScheduleInterview={handleScheduleInterview}
                onBackClick={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterViewScheduler;
