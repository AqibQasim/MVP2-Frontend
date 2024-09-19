import ButtonCapsule from "./ButtonCapsule";
import Hr from "./Hr";

const TestInstruction = ({
  instructionsPopups,
  isLoading,
  setIsLoading,
  onClose,
  heading,
  options = ["No options provided"],
}) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
        {isLoading ? (
          <>
            <div className="loader"></div>
            <h2 className="text-center">
              Assessment is being prepared, make sure to read all the
              instructions before starting it!
            </h2>
          </>
        ) : (
          <div className="flex h-[30rem] w-[40rem] flex-col justify-between gap-6 rounded-4xl bg-white p-6 shadow-lg">
            <div className="w-full">
              <h1 className="mb-4 text-start text-2xl font-[600]">
                {heading ? heading : "Assessment Instructions"}
              </h1>
              <div className="max-h-[19rem] rounded-4xl bg-[#F8F7FA] p-6 text-gray-700">
                <ul className="list-none">
                  {options.map((option, index) => (
                    <div className="h-auto">
                      <li key={index} className="flex items-center space-x-2">
                        <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                        <span>{option}</span>
                      </li>
                      <Hr />
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-end">
              <ButtonCapsule>Let's Start</ButtonCapsule>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TestInstruction;
