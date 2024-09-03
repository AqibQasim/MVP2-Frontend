import React from 'react';
import '../styles/overlay.css';


const Overlay = ({ isVisible, children }) => {
 

  if (!isVisible) return null;


  return (
    <div className="w-full h-full fixed inset-0 flex items-center justify-center bg-white bg-opacity-10 backdrop-blur-md z-50 overflow-hidden">
      <div className="w-[50%] max-h-[90vh] overflow-y-auto relative bg-white px-6 py-3 rounded-[2rem] shadow-2xl custom-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default Overlay;
