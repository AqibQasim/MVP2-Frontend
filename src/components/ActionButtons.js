import Image from "next/image";

const ActionButtons = ({onBackClick}) => {
    return (
        <div className="flex justify-between gap-[0.5rem]">
            <button onClick={onBackClick} className="flex items-center gap-3 w-[50%] text-[0.8rem] font-semibold  py-1  rounded-full bg-primary-tint-100">
                <div className="px-2">
                    <Image className="h-9 w-11 p-3  bg-white rounded-full" src='/icons/left-arrow.svg' width={10} height={10} />
                </div>
                <span>Back</span>
            </button>

            <button className="flex justify-between items-center gap-3 w-[50%] text-[0.8rem] text-white font-semibold py-1  rounded-full bg-primary">
                <span className="px-5">Back</span>
                <div className="px-2">
                    <Image className="h-9 w-11 px-0 p-3  bg-white rounded-full" src='/icons/right-arrow.svg' width={10} height={10} />
                </div>
            </button>
        </div>
    )
}

export default ActionButtons;