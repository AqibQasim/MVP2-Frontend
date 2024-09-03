import Image from "next/image";

const SuccessModal = ({ mainHeading, text, onClose }) => {

    return (
        <>
            <div className="w-[100%] h-[85vh] flex flex-col justify-around items-center font-lufga">
                <div className="flex flex-col items-center">
                    <Image className="mb-[1rem]" src='/successImage.svg' width={300} height={300} />
                    <div className="flex flex-col justify-center items-center">
                        <h2 className=" w-[90%] text-center text-xl font-semibold">{mainHeading}</h2>
                        <p className="w-[80%] text-center tes text-sm mt-[0.5rem]">{text}</p>
                    </div>

                    <Image src="/line.svg" className="w-[80%] m-4" width={20} height={20} />

                    <button onClick={onClose} className="flex justify-between items-center gap-3 w-[80%] text-[0.8rem] text-white font-semibold py-1  rounded-full bg-primary">
                        <span className="px-5">Okay, I understand.</span>
                        <div className="px-2">
                            <Image className="h-9 w-11 px-0 p-3  bg-white rounded-full" src='/icons/right-arrow.svg' width={10} height={10} />
                        </div>
                    </button>
                </div>

                <div className="w-auto mt-[3rem] flex justify-center border-primary border-[1px] py-[0.3rem] px-[0.2rem] rounded-full bg-primary-tint-90">
                    <span className="text-primary font-lufga text-[0.6rem]"><span className="font-semibold">Note:</span> Do note refresh, close or click back button in this pages. Your data might loss.</span>
                </div>
            </div >


        </>
    )
}

export default SuccessModal;