import React from 'react';

const Overlay = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null; 

  return (
    <div className="w-[100%] fixed inset-0 flex items-center justify-center bg-white bg-opacity-10 backdrop-blur-md z-50">
      <div className="w-[30%] relative bg-white p-6 rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
