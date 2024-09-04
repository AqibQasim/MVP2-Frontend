import Image from "next/image";
import SuccessAckBtn from "./SuccessAckBtn";

const SuccessModal = ({ mainHeading, text, onClose }) => {

    return (
        <>
            <div className="w-[50%] max-h-[90vh] overflow-y-auto relative bg-white px-6 py-3 rounded-[2rem] shadow-2xl custom-scrollbar">
                <div className="w-[100%] h-[85vh] flex flex-col justify-around items-center font-lufga">
                    <div className="flex flex-col items-center">
                        <Image className="mb-[1rem]" src='/successImage.svg' width={300} height={300} />
                        <div className="flex flex-col justify-center items-center">
                            <h2 className=" w-[90%] text-center text-xl font-semibold">{mainHeading}</h2>
                            <p className="w-[80%] text-center tes text-sm mt-[0.5rem]">{text}</p>
                        </div>

                        <Image src="/line.svg" className="w-[80%] m-4" width={20} height={20} />

                        <SuccessAckBtn onClickHandler={onClose} />
                    </div>

                    <div className="w-auto mt-[3rem] flex justify-center border-primary border-[1px] py-[0.3rem] px-[0.2rem] rounded-full bg-primary-tint-90">
                        <span className="text-primary font-lufga text-[0.6rem]"><span className="font-semibold">Note:</span> Do note refresh, close or click back button in this pages. Your data might loss.</span>
                    </div>
                </div >
            </div>
        </>
    )
}

export default SuccessModal;