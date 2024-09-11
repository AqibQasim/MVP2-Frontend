import Image from "next/image";

const SuccessAckBtn = ({ onClickHandler }) => {
  // const cumulativeHandler = () => {
  //     onSuccessAck();
  // }

  return (
    <button
      onClick={onClickHandler}
      className="flex w-[100%] items-center justify-between gap-3 rounded-full bg-primary py-1 text-[0.8rem] font-semibold text-white"
    >
      <span className="px-5">Okay, I understand.</span>
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
  );
};

export default SuccessAckBtn;
