import Image from "next/image";
import SuccessAckBtn from "./SuccessAckBtn";

const ActionButtons = ({onSuccessAck, isContinued, onScheduleInterview, onBackClick }) => {
    return (
        <div className="flex justify-between gap-[0.5rem]">
            {
                isContinued ? (
                    <>
                        <SuccessAckBtn onClickHandler={onSuccessAck} />
                    </>
                ) : (
                    <>
                        <button onClick={onBackClick} className="flex items-center gap-3 w-[50%] text-[0.8rem] font-semibold  py-1  rounded-full bg-primary-tint-100">
                            <div className="px-2">
                                <Image className="h-9 w-11 p-3  bg-white rounded-full" src='/icons/left-arrow.svg' width={10} height={10} />
                            </div>
                            <span>Back</span>
                        </button>

                        <button onClick={onScheduleInterview} className="flex justify-between items-center gap-3 w-[50%] text-[0.8rem] text-white font-semibold py-1  rounded-full bg-primary">
                            <span className="px-5 text-[0.7rem]">Schedule Interview</span>
                            <div className="px-2">
                                <Image className="h-9 w-11 px-0 p-3  bg-white rounded-full" src='/icons/right-arrow.svg' width={10} height={10} />
                            </div>
                        </button>
                    </>
                )
            }
        </div>
    )
}

export default ActionButtons;