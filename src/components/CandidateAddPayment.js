import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useRef } from "react";
import CandidateProfileInfo from "./CandidateProfileInfo";
import Heading from "./Heading";
import Modal from "./AdminJobsFormModal";
import ButtonCapsule from "./ButtonCapsule";
import ButtonBack2 from "./ButtonBack2";



function CandidateEvaluateYourselfCard({ candidate }) {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethodId, setSelectedMethodId] = useState(null);
  const [cardholderName, setCardholderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ibanNumber, setIbanNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const paymentElementRef = useRef(null);

  
  const router = useRouter();
  const candidate_id = usePathname().split("/")[2];
  // const dispatch = useDispatch();
  const handleOpenModal = () => {
    setIsModalOpen(true);
};

const handleCloseModal = () => {
    setIsModalOpen(false);
    // Clean up the payment element when modal closes
   
};

const handleSubmit = (event) => {
  event.preventDefault();
  // Handle form submission here, e.g., send data to an API
};


  
  return (
    <div className="size-full flex-grow gap-8 rounded-4xl bg-neutral-white px-8 py-10">
      

      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex h-auto w-auto flex-col items-center justify-center space-y-6">
          {/* Profile Image */}
          <div className="relative h-[140px] w-[140px] overflow-hidden rounded-full bg-bg-avatar">
            <Image
              src={"/avatars/avatar-3.svg"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              alt="Avatar image"
            />
          </div>

          {/* Welcome Message */}
          <div className="text-center">
            <Heading sm className="font-medium" style={{ fontSize: "34px" }}>
            Add Payment Method
            </Heading>
            <p className="text-grey-primary-shade-30">
            Look like you haven’t saved any credit card yet, click on the button to add the first one.
            </p>
          </div>
          

          <div>
            <button
              onClick={handleOpenModal}
              className="flex flex-row items-center justify-between gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold capitalize text-neutral-white"
            >
              Add Payment Method
              <Image
                width={23}
                height={24.3}
                src={"/evaluate-yourself.svg"}
                alt="Evaluate yourself ic on"
              />
            </button>
          </div>
        </div>
      </div>

             {/* Modal */}
             <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="w-fit gap-1 rounded-[24px] bg-neutral-white p-2  ">

                <form onSubmit={handleSubmit}>
      <div className="text-4xl mb-5">Billing Info</div>

      <div className="flex flex-col space-y-3">
        <div>
          <label>Account Title</label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="p-2 rounded-5xl w-full border-2 ms-2"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label>Account No.</label>
          <input
            type="number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="p-2 rounded-5xl w-full border-2 ms-2"
            placeholder="123456789"
            required
          />
        </div>

        <div>
          <label>IBAN No.</label>
          <input
            type="text"
            value={ibanNumber}
            onChange={(e) => setIbanNumber(e.target.value)}
            className="p-2 rounded-5xl w-full border-2 ms-2"
            placeholder="IBAN123456789"
            required
          />
        </div>

        <div>
          <label>Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="p-2 rounded-5xl w-full border-2 ms-2"
            placeholder="Bank Name"
            required
          />
        </div>
      </div>

      <div className="flex mt-4 space-x-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded-5xl w-36 border-2 ms-2"
          placeholder="City"
          required
        />

        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="p-2 rounded-5xl w-36 border-2 ms-2"
          placeholder="Country"
          required
        />

        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="p-2 rounded-5xl w-36 border-2 ms-2"
          placeholder="State"
          required
        />
      </div>

      <div className="flex w-full space-x-2 mt-4">
        <div className="flex-1">
          <ButtonBack2 onClick={handleCloseModal} className="min-w-full">
            Close
          </ButtonBack2>
        </div>
        <div className="flex-1">
          <ButtonCapsule className="flex-1 min-w-full p-3" type="submit">
            Add Account
          </ButtonCapsule>
        </div>
      </div>
    </form>

                
                </div>
            </Modal>

    
    </div>
  );
}

export default CandidateEvaluateYourselfCard;
