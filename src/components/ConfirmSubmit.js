import Image from "next/image";

function ConfirmSubmit({ onCloseModal, onSubmit }) {
  return (
    <div className="text-lg">
      <h3 className="text-2xl font-semibold text-black mb-6">Confirm</h3>
      <div className="bg-white-purple-shade border border-light-grey rounded-3xl text-start p-6 mb-6">
        <p className="text-sm font-medium">
          {" "}
          Are you sure you wish to submit the test? Once submitted, you won't be
          able to make any changes. Please review your answers carefully before
          proceeding
        </p>
      </div>
      <div className="float-end flex gap-4">
        <button
          onClick={onCloseModal}
          className="bg-white-purple-shade text-[1rem] font-bold py-4 px-6 rounded-3xl"
        >
          Close
        </button>
        <button
          onClick={onSubmit}
          className="flex justify-between gap-8 items-center rounded-3xl py-3 px-4 font-sans font-semibold  text-white bg-primary"
        >
          Submit <Image src="/Tick.svg" height={15} width={15} />
        </button>
      </div>
    </div>
  );
}

export default ConfirmSubmit;
