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
                    <form >
                       
                    <div className="text-4xl  mb-5" >
                           Billing Info
                         </div  >


                          
                       <div className="flex  flex-col space-y-3">

                       <div>
                          <p>Account Tittle.</p>
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
                          <p>Account No.</p>
                         <input
                                type="Number"
                                value={cardholderName}
                                onChange={(e) => setCardholderName(e.target.value)}
                                className="p-2 rounded-5xl w-full border-2 ms-2"
                                placeholder="John Doe"
                                required
                            />
                           
                         </div>
                         <div>
                          <p>IBAN No.</p>
                         <input
                                type="Number"
                                value={cardholderName}
                                onChange={(e) => setCardholderName(e.target.value)}
                                className="p-2 rounded-5xl w-full border-2 ms-2"
                                placeholder="John Doe"
                                required
                            />
                           
                         </div>
                         <div>
                          <p>Bank Name</p>
                         <input
                                type="text"
                                value={cardholderName}
                                onChange={(e) => setCardholderName(e.target.value)}
                                className="p-2 rounded-5xl w-full border-2 ms-2"
                                placeholder="John Doe"
                                required
                            />
                           
                         </div>
                         </div>
                          
                            <div className="flex mt-4" >
                                <div> 
                                 <input
                                type="text"
                                value={cardholderName}
                                onChange={(e) => setCardholderName(e.target.value)}
                                className="p-2 rounded-5xl w-36  border-2 ms-2"
                                placeholder="City"
                                required
                            />
                            </div>
                                <div>
                                <input
                                type="text"
                                value={cardholderName}
                                onChange={(e) => setCardholderName(e.target.value)}
                                className="p-2 rounded-5xl w-36  border-2 ms-2"
                                placeholder="Country"
                                required
                            />
                            </div>
                             <div>
                             <input
                                type="text"
                                value={cardholderName}
                                onChange={(e) => setCardholderName(e.target.value)}
                                className="p-2 w-36  rounded-5xl border-2 ms-2"
                                placeholder="State"
                                required
                            />
                           </div>
                        
                        
                            </div>
                            <div className="flex w-full space-x-2 mt-4" >
                              <div className="flex-1" >
                              <ButtonBack2 onClose={handleCloseModal} className=" min-w-full p- " >
                               Close
                              </ButtonBack2   >
                              </div>
                            <div className="flex-1" >
                            <ButtonCapsule  className="flex-1 min-w-full p-3"  >
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
