import React from "react";
import "../styles/overlay.css";

const Overlay = ({ closeoverlay, children }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-hidden bg-white bg-opacity-10 backdrop-blur-md"
      onClick={closeoverlay}
    >
      <div
        className="custom-scrollbar relative max-h-[90vh] w-[50%] overflow-y-auto rounded-[2rem] bg-white px-6 py-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Overlay;
