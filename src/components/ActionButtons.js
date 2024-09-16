import Image from "next/image";
import SuccessAckBtn from "./SuccessAckBtn";

const ActionButtons = ({
  onSuccessAck,
  isContinued,
  onScheduleInterview,
  onBackClick,
}) => {
  return (
    <div className="flex justify-between gap-[0.5rem]">
      {!isContinued ? (
        <>
          <button
            onClick={onBackClick}
            className="flex w-[50%] items-center gap-3 rounded-full bg-primary-tint-100 py-1 text-[0.8rem] font-semibold"
          >
            <div className="px-2">
              <Image
                alt="Chevron left icon"
                className="h-9 w-11 rounded-full bg-white p-3"
                src="/icons/left-arrow.svg"
                width={10}
                height={10}
              />
            </div>
            <span>Back</span>
          </button>

          <button
            onClick={onScheduleInterview}
            className="flex w-[50%] items-center justify-between gap-3 rounded-full bg-primary py-1 text-[0.8rem] font-semibold text-white"
          >
            <span className="px-5 text-[0.7rem]">Schedule Interview</span>
            <div className="px-2">
              <Image
                alt="Chevron right icon"
                className="h-9 w-11 rounded-full bg-white p-3 px-0"
                src="/icons/right-arrow.svg"
                width={10}
                height={10}
              />
            </div>
          </button>
        </>
       
      ) : (
         <>
          <SuccessAckBtn onClickHandler={onSuccessAck} />
        </>
      )}
    </div>
  );
};

export default ActionButtons;
