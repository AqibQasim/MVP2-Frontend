import Overlay from "@/components/Overlay";
import SuccessModal from "@/components/SuccessModal";
import { useState, useEffect } from "react";

function HandleOpenOverlay2() {
  const [isOverlayVisible2, setOverlayVisible2] = useState(false);

  const handleOpenOverlay2 = () => {
    console.log("clickinggg .... ");
    setOverlayVisible2(true);
  };

  const handleCloseOverlay2 = () => {
    console.log("clickkkkkkk");
    setOverlayVisible2(false);
  };

  useEffect(() => {
    console.log("[isOverlayVisible2]:", isOverlayVisible2);
  }, [isOverlayVisible2]);

  const mainHeading = (
    <span>
      Your account is successfully{" "}
      <span
        style={{
          backgroundImage: "linear-gradient(to right, #4624E0, white)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline",
        }}
      >
        Created.
      </span>
    </span>
  );

  let text = (
    <>
      Your account is currently under review. Soon you’ll receive an email on{" "}
      <span className="font-semibold">janedoe@gmail.com</span> upon approval
    </>
  );

  return (
    <>
      {isOverlayVisible2 &
      (
        <Overlay isVisible={isOverlayVisible2}>
          <SuccessModal
            onClose={handleCloseOverlay2}
            imgSrc="/Message.png"
            mainHeading={mainHeading}
            text={text}
            buttonText={"Verify email"}
            onBoarding={true}
            containsOtp={true}
            handleOpenOverlay2={handleOpenOverlay2} // Pass the function here
          />
          {/* <InterViewScheduler onClose={handleCloseOverlay} /> */}
        </Overlay>
      )}
    </>
  );
}

export default HandleOpenOverlay2;
