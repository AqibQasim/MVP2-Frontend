import Image from "next/image";

const SuccessAckBtn = ({onClickHandler}) => {

    // const cumulativeHandler = () => {
    //     onSuccessAck();
    // }

    return (
        <button onClick={onClickHandler} className="flex justify-between items-center gap-3 w-[100%] text-[0.8rem] text-white font-semibold py-1  rounded-full bg-primary">
            <span className="px-5">Okay, I understand.</span>
            <div className="px-2">
                <Image className="h-9 w-11 px-0 p-3  bg-white rounded-full" src='/icons/right-arrow.svg' width={10} height={10} />
            </div>
        </button>
    )
}

export default SuccessAckBtn;