import LoaderIcon from "@/svgs/LoaderIcon";
import Image from "next/image";

function ConfirmSubmit({ onCloseModal, onSubmit, isLoading }) {
  return (
    <div className="text-lg">
      <h3 className="mb-6 text-2xl font-semibold text-black">Confirm</h3>
      <div className="bg-white-purple-shade border-light-grey mb-6 rounded-3xl border p-6 text-start">
        <p className="text-sm font-medium">
          {" "}
          Are you sure you wish to submit the test? Once submitted, you
          won&#39;t be able to make any changes. Please review your answers
          carefully before proceeding
        </p>
      </div>
      <div className="float-end flex gap-4">
        <button
          onClick={onCloseModal}
          className="bg-white-purple-shade rounded-3xl px-6 py-4 text-[1rem] font-bold"
        >
          Close
        </button>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="flex items-center justify-between gap-8 rounded-3xl bg-primary px-4 py-3 font-sans font-semibold text-white"
        >
          {isLoading ? (
            <div className="flex items-center">
              <LoaderIcon />
              <span className="ml-2">Submiting...</span>
            </div>
          ) : (
            <>
              Submit <Image src="/Tick.svg" height={15} width={15} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ConfirmSubmit;
